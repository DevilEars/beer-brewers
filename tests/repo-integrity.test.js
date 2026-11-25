import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".pio",
  ".next",
]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

/** Minimal RFC 4180-style CSV parse (quoted fields, doubled quotes, CRLF). */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch === "\r") {
      // swallow; newline handles the row
    } else {
      field += ch;
    }
  }
  if (inQuotes) {
    throw new Error("unterminated quoted field");
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

const REQUIRED_BOM_COLUMNS = [
  "part",
  "spec",
  "qty",
  "example_sa_supplier_url",
  "price_zar_inc_vat",
  "price_observed",
  "stock_when_observed",
  "tier",
  "notes",
];

describe("bom.csv files", () => {
  it("parse and have the expected columns and field shapes", async () => {
    const files = (await walk(repoRoot)).filter((f) => path.basename(f) === "bom.csv");
    assert.ok(files.length > 0, "expected at least one bom.csv");

    for (const file of files) {
      const rel = path.relative(repoRoot, file);
      const text = await readFile(file, "utf8");
      const rows = parseCsv(text);
      assert.ok(rows.length >= 2, `${rel} must have a header and at least one data row`);

      const header = rows[0].map((h) => h.trim());
      for (const col of REQUIRED_BOM_COLUMNS) {
        assert.ok(header.includes(col), `${rel} is missing column ${col}`);
      }

      const index = Object.fromEntries(header.map((name, i) => [name, i]));
      for (let r = 1; r < rows.length; r += 1) {
        const cells = rows[r];
        assert.equal(
          cells.length,
          header.length,
          `${rel} row ${r + 1} has ${cells.length} fields, expected ${header.length}`,
        );
        const part = cells[index.part].trim();
        assert.ok(part, `${rel} row ${r + 1} has an empty part name`);

        const qty = cells[index.qty].trim();
        assert.ok(qty, `${rel} row ${r + 1} (${part}) has an empty qty`);
        if (/^\d/.test(qty)) {
          assert.match(qty, /^[1-9]\d*$/, `${rel} row ${r + 1} (${part}) numeric qty must be a positive integer: ${qty}`);
        }

        const url = cells[index.example_sa_supplier_url].trim();
        if (url) {
          assert.doesNotMatch(
            url,
            /^https?:\/\/https?:\/\//i,
            `${rel} row ${r + 1} (${part}) has a doubled-scheme URL`,
          );
          let parsed;
          try {
            parsed = new URL(url);
          } catch (err) {
            assert.fail(`${rel} row ${r + 1} (${part}) has an invalid URL: ${url} (${err.message})`);
          }
          assert.match(parsed.protocol, /^https?:$/, `${rel} row ${r + 1} (${part}) URL must be http(s)`);
        }

        const price = cells[index.price_zar_inc_vat].trim();
        if (price) {
          assert.match(
            price,
            /^\d+(\.\d+)?$/,
            `${rel} row ${r + 1} (${part}) price must be a number or blank, got ${price}`,
          );
        }
      }
    }
  });
});

function stripMarkdownFences(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
}

function markdownLinks(markdown) {
  const links = [];
  const body = stripMarkdownFences(markdown);
  const re = /!?\[([^\]]*)\]\((<)?([^>\s)]+)(>)?(?:\s+"[^"]*")?\)/g;
  let match;
  while ((match = re.exec(body)) !== null) {
    links.push(match[3]);
  }
  return links;
}

describe("markdown links", () => {
  it("are well-formed and relative targets exist", async () => {
    const files = (await walk(repoRoot)).filter((f) => f.endsWith(".md"));
    assert.ok(files.length > 0, "expected markdown files");

    const problems = [];
    for (const file of files) {
      const rel = path.relative(repoRoot, file);
      const text = await readFile(file, "utf8");
      for (const href of markdownLinks(text)) {
        if (!href || href === "#") {
          problems.push(`${rel}: empty link target`);
          continue;
        }
        if (/^https?:\/\/https?:\/\//i.test(href)) {
          problems.push(`${rel}: doubled-scheme URL ${href}`);
          continue;
        }
        if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {
          try {
            // eslint-disable-next-line no-new
            new URL(href);
          } catch (err) {
            problems.push(`${rel}: invalid absolute URL ${href} (${err.message})`);
          }
          continue;
        }
        const unsuffixed = href.split("#")[0].split("?")[0];
        if (!unsuffixed) continue; // pure fragment
        const target = path.resolve(path.dirname(file), decodeURIComponent(unsuffixed));
        try {
          await stat(target);
        } catch {
          problems.push(`${rel}: relative link target does not exist: ${href}`);
        }
      }
    }
    assert.equal(problems.length, 0, problems.join("\n"));
  });
});

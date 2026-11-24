# Brewing software and hardware landscape (November 2026)

- **Date of survey:** 24 November 2026
- **Times in this document** are Africa/Johannesburg (SAST, UTC+2) unless a source is quoted with its own timezone.
- **Method:** GitHub API reads (as DevilEars) plus the cited project pages. This is a snapshot, not a claim that every homepage was re-read end-to-end.
- **Purpose:** inform the beer-brewers recipe app and the DIY hardware/software resource. Prefer integrating with existing projects over reinventing them.

## 1. Recipe formats: BeerXML vs BeerJSON

**BeerXML 1.0** remains the most widely implemented recipe interchange format. A file is XML. Units are fixed by the specification and are not written beside each value (weights in kilograms, volumes in litres, temperatures in °C). Mash steps, fermentation (typically up to three stages plus aging), and hop use are relatively thin — for example there is no first-class whirlpool / hop-stand field. Official home: [https://beerxml.com/](https://beerxml.com/).

A **BeerXML 2.01** draft existed around 2007 but was never finished or broadly adopted. Community discussion has treated that effort as stalled, and the official site has long looked inactive. [brewpoo/BeerXML-Standard](https://github.com/brewpoo/BeerXML-Standard) notes that beerxml.com appeared abandoned when that mirror was created. A comparison that restates the unit and process-detail differences is [Sparj: BeerXML vs BeerJSON](https://sparj.app/brew-guide/beerxml-vs-beerjson) (updated 23 October 2026).

**BeerJSON** is the active successor. It is developed at [beerjson/beerjson](https://github.com/beerjson/beerjson) (MIT) and is explicitly based on the unfinished BeerXML 2 draft. Every measurement carries a unit. Mash, boil, fermentation, packaging, and souring can be described in more detail. Format version **3.0** was prepared on `main` in November 2026: commit `68e8748b9a`, message “Prepare release 3.0.0 (#280)”, 18 November 2026, 22:34 SAST. The project's changelog discusses 3.0.0 with a date of 6 November 2026. At survey time, GitHub's Releases list still only showed `v1.0.2` (12 October 2021), so 3.0.0 should not be called a GitHub Release until a release tag exists.

**Support is catching up.** [Brewtarget's help](https://www.brewtarget.beer/help/) documents BeerXML and BeerJSON in Brewtarget and Brewken. That page still said Brewfather lacked BeerJSON “as of 2024”. Brewfather's own [changelog](https://docs.brewfather.app/changelog) later added BeerJSON import and export in version 3.1.0 (31 August 2026).

**Recommendation for this project:** BeerJSON as the native format, with BeerXML import for compatibility. See [ADR 0001](../adr/0001-recipe-format.md).

## 2. Notable software and firmware

Commercial tools that are **not** open source, listed only for context: Brewfather, BeerSmith, Brewer's Friend; Tilt and RAPT Pill hydrometers; Grainfather and similar electric all-in-one kettles; Plaato; Inkbird and stock STC-1000 controllers.

**Last activity** below is GitHub `pushed_at` (or a named release), converted to SAST, as read on 24 November 2026.

| Name | What | License | Last activity (SAST) | URL |
|---|---|---|---|---|
| BeerJSON | Recipe interchange spec and schemas | MIT | 18 Nov 2026 22:34 (3.0.0 prep commit; no 3.0 GitHub Release tag yet) | https://github.com/beerjson/beerjson |
| Brewtarget | Desktop recipe tool (Linux, macOS, Windows); BeerXML and BeerJSON | GPL-3.0 | 23 Nov 2026 00:20; release 5.3.1 on 19 Nov 2026 11:08 | https://github.com/Brewtarget/brewtarget |
| Brewken | Brewtarget-derived tool aimed at microbrewers (inventory, duty, batches) | GPL-3.0 | 23 Nov 2026 00:20; release 5.3.0 on 16 Nov 2026 23:11 | https://github.com/Brewken/brewken |
| BrewBlox | Current BrewPi-line brewery control stack (Raspberry Pi + Spark hardware) | UI: GPL-3.0 in `package.json` (GitHub detected no LICENSE file). `brewblox-ctl` and docs: GPL-3.0 | UI 24 Nov 2026 00:51; ctl 1 Oct 2026 07:55 | https://github.com/BrewBlox/brewblox-ui , https://github.com/BrewBlox/brewblox-ctl |
| BrewPi (classic) | Older Spark/Arduino fermentation control. Upstream looks stale; see community forks | Firmware: AGPL-3.0. No license file found via API on `brewpi-script` | Last firmware push 18 Dec 2018 | https://github.com/BrewPi/firmware |
| BrewPi Remix | Community continuation of classic BrewPi (tools, script, www, PCBs) | Mostly GPL-3.0; PCB repo MIT | tools-rmx 21 Oct 2026 01:03 | https://github.com/brewpi-remix/brewpi-tools-rmx |
| CraftBeerPi 4 | Raspberry Pi brew and fermentation controller (GPIO, plugins). Original org is quieter; **active work is the PiBrewing fork** (docs and PyPI point there) | GPL-3.0 | PiBrewing fork 22 Nov 2026 20:55; `craftbeerpi/craftbeerpi4` last push 30 Jul 2023 | https://github.com/PiBrewing/craftbeerpi4 , docs https://openbrewing.gitbook.io/craftbeerpi4_support |
| Fermentrack | Django UI for BrewPi-class controllers plus Tilt / iSpindel logging | MIT (their docs say bundled brewpi-script is GPL-3) | 9 Jun 2024 11:30 — quieter than the others | https://github.com/thorrak/fermentrack |
| BrewPiLess | ESP8266/ESP32 “BrewPi without a Pi”; iSpindel, Tilt, and RAPT Pill support | **Could not be determined** — no repository license file; only vendored-library licenses in the tree | 24 Apr 2025 05:12; release 4.4 on 18 Apr 2024 13:35 | https://github.com/vitotai/BrewPiLess |
| iSpindel | DIY electronic hydrometer (ESP8266 + gyro). Hardware design is widely cloned | **Not an OSI/open license.** Custom terms: personal modification allowed; distributing modified versions only via the official release; commercial distribution needs permission. Source: the project's [LICENSE](https://github.com/universam1/iSpindel/blob/master/LICENSE) | Push 12 May 2025 15:14; latest release 7.3.3 on 8 Aug 2023 14:07 | https://github.com/universam1/iSpindel |
| Gravitymon | iSpindel-compatible replacement firmware; also ESP32-C3/S2/S3 boards | Dual license: GPL-3 for open-source / hobbyist use (the LICENSE text includes a hobbyist safe harbour of ≤100 units per year) **or** a commercial license | 19 Nov 2026 21:34; release v2.5.0 on 23 Jun 2026 18:37 (project docs also mentioned 2.6.0) | https://github.com/mp-se/gravitymon |
| TiltBridge | ESP32 Bluetooth-to-WiFi bridge for commercial Tilt hydrometers | Apache-2.0 (LICENSE text; GitHub SPDX was `NOASSERTION`) | 15 Nov 2026 17:36 | https://github.com/thorrak/tiltbridge |
| Brick-32 | Low-cost ESP32 mash and fermentation controller; combinable “bricks” | GPL-3.0 | 6 Aug 2025 12:51 | https://github.com/BernhardSchlegel/Brick-32 |
| Brautomat32 | ESP32 brewing and fermentation controller with adaptive PID | MIT | 24 Nov 2026 20:11 | https://github.com/InnuendoPi/Brautomat32 |
| esp-brew-engine | ESP brew controller engine | GitHub SPDX `NOASSERTION` — **license not verified** in this survey | 28 Aug 2026 07:33 | https://github.com/jeroen79/esp-brew-engine |

## 3. Hardware landscape

Typical DIY mash rigs:

- **BIAB** — brew-in-a-bag: a single kettle, a malt bag, and temperature control (often a PID and SSR).
- **RIMS** — recirculating infusion mash with a heated tube in the recirculation loop.
- **HERMS** — heat-exchanged recirculating mash, usually a coil in the hot-liquor tank.
- **Electric all-in-one** — a single vessel with an element, malt pipe, and pump (Grainfather / Brewzilla / Guten class). This is the path in [`hardware/builds/diy-all-in-one/`](../../hardware/builds/diy-all-in-one/).

Common sensors and actuators: DS18B20 or PT100/PT1000 temperature probes, SSRs, pumps, and solenoids. Control stacks run on a Raspberry Pi (CraftBeerPi, BrewBlox, Fermentrack) or on ESP32/ESP8266 (BrewPiLess, Brick-32, Brautomat32).

Gravity during fermentation: DIY tilt hydrometers (iSpindel hardware, often with Gravitymon firmware) versus commercial Tilt (open-source TiltBridge) and RAPT Pill (BrewPiLess can read BLE).

A useful resource catalogues these options with license, activity, electrical notes, and local supplier links — it does not need to invent a new controller first.

## 4. Suggested first milestones

These are planning notes, not a commitment in this document:

1. Finish repository hygiene (license, branch/PR workflow, secret scanning). That work is in progress in this repository.
2. Record format and “integrate, don't reinvent” decisions (this file and ADR 0001).
3. Recipe app MVP: create/edit a recipe, estimate OG / IBU / ABV / colour, BeerJSON round-trip, BeerXML import, a few samples.
4. Expand the DIY resource: short pages for controllers, hydrometers, and BIAB / RIMS / HERMS, with citations and South African supplier cross-links.
5. Optional later: read-only ingest of Gravitymon / iSpindel / TiltBridge telemetry, once the recipe app has a place to put the data.

## 5. What this survey did not verify

- Live accuracy of every upstream homepage beyond GitHub metadata and the pages cited above.
- A GitHub Release tag for BeerJSON 3.0.0 (code and changelog exist; Releases still listed `v1.0.2`).
- BrewPiLess's project-level license, and the license of esp-brew-engine.
- A LICENSE file for BrewBlox UI (only the `package.json` field was found).
- Current stock, prices, or websites for the 2020–2021 entries in [`docs/suppliers.md`](../suppliers.md), except where a later hardware brief cites a shop on 24 November 2026.

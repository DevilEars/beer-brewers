# ADR 0001: Recipe interchange format

- **Status:** Accepted
- **Date:** 2026-11-24
- **Deciders:** De Villiers Neethling (repository owner), following the November 2026 landscape survey

## Context

The planned recipe app needs a file format for storing recipes and moving them between this project and other brewing tools. Two formats are in common use:

- **BeerXML 1.0** is still the most widely implemented interchange format. Units are implicit in the spec (kilograms, litres, °C) rather than written beside each value, and mash, fermentation, and hop-stand / whirlpool detail is relatively thin. The official home is [beerxml.com](https://beerxml.com/). A BeerXML 2.01 draft existed around 2007 but was never finished or broadly adopted. Community notes have long treated that draft, and the official site, as stalled or abandoned (see [brewpoo/BeerXML-Standard](https://github.com/brewpoo/BeerXML-Standard) and the landscape survey).
- **BeerJSON** is the active successor, developed in [beerjson/beerjson](https://github.com/beerjson/beerjson) (MIT) and explicitly based on the unfinished BeerXML 2 draft. Every measurement carries a unit. Process schedules (mash, boil, fermentation, packaging, souring) are richer. Format version 3.0 was prepared on `main` in November 2026 (commit message “Prepare release 3.0.0 (#280)” on 18 November 2026). GitHub's Releases list still showed `v1.0.2` (October 2021) at the time of the survey, so 3.0.0 should not be described as a GitHub Release until a release tag exists.

Application support is uneven but improving. Brewtarget and Brewken already document BeerXML and BeerJSON support ([Brewtarget help](https://www.brewtarget.beer/help/)). That help page still said Brewfather lacked BeerJSON “as of 2024”; Brewfather's own changelog later added BeerJSON import and export in version 3.1.0 (31 August 2026) ([Brewfather changelog](https://docs.brewfather.app/changelog)).

Reinventing a third private format would make sharing with Brewtarget, Brewken, Brewfather, and other tools harder for no gain.

## Decision

1. **BeerJSON is the native recipe format** for the beer-brewers recipe app (store, edit, and export).
2. **BeerXML import is required** so existing recipes can be brought in from the many tools that still write BeerXML 1.0.
3. BeerXML export is optional and can be added later if needed for a specific downstream tool. It is not required for the first milestone.
4. After import, calculated values (OG, IBU, colour, ABV) should be treated as estimates that this app may recompute. Interchange files do not guarantee identical numbers across programs.

## Consequences

- The app should validate BeerJSON against the published schemas and record the format version it writes (follow the 3.x series unless a later survey says otherwise).
- BeerXML import will have to map implicit units and thinner process fields into BeerJSON. Some detail (for example hop-stand temperature) may be incomplete and should be surfaced rather than silently invented.
- We can share recipes with tools that already speak BeerJSON, and still accept files from BeerXML-only tools.
- See also the November 2026 survey: [`docs/research/landscape-2026-11.md`](../research/landscape-2026-11.md).

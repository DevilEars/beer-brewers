# DIY hardware and software resource

This tree is the open-source DIY hardware and software resource for beer-brewers: controllers, sensors, and mash-system builds, with licenses, activity notes, and South African sourcing where we have it.

It is a catalogue and design-brief collection, not a new commercial product. Prefer linking to and documenting existing open-source projects over inventing a parallel controller.

A landscape survey (formats, notable software, hardware) is in [`docs/research/landscape-2026-11.md`](../docs/research/landscape-2026-11.md). Local suppliers are listed in [`docs/suppliers.md`](../docs/suppliers.md).

## Builds

| Build | Status | Notes |
|---|---|---|
| [DIY electric all-in-one](builds/diy-all-in-one/) | Research and design only (brief dated 24 November 2026) | Single-vessel recirculating mash (DigiBoil + DigiMash + Brautomat32). See that folder's README for safety notes, BOM, and shopping list. Nothing in that brief should be treated as a wiring certificate. |

## Planned index sections

These folders are not created yet. They will collect short, cited notes rather than full clones of upstream projects:

- **Controllers** — for example BrewBlox, CraftBeerPi 4, BrewPiLess, Brautomat32, and related Raspberry Pi / ESP32 stacks.
- **Sensors** — DIY hydrometers (iSpindel hardware, Gravitymon firmware), and bridges for commercial devices such as Tilt (TiltBridge).
- **Mash systems** — BIAB, RIMS, and HERMS layouts, including the all-in-one path above.

## Contributing

Add or update a build brief on a branch and open a pull request. Never push directly to `master`. See [`CONTRIBUTING.md`](../CONTRIBUTING.md).

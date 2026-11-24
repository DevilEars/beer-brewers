# DIY hardware and software resource

This tree is the open-source DIY hardware and software resource for beer-brewers: controllers, sensors, and mash-system builds, with licenses, activity notes, and South African sourcing where we have it.

It is a catalogue and design-brief collection, not a new commercial product. Prefer linking to and documenting existing open-source projects over inventing a parallel controller.

A landscape survey (formats, notable software, hardware) is in [`docs/research/landscape-2026-11.md`](../docs/research/landscape-2026-11.md). Local suppliers are listed in [`docs/suppliers.md`](../docs/suppliers.md).

## Builds

| Build | Status | Notes |
|---|---|---|
| [DIY electric all-in-one](builds/diy-all-in-one/) | Research and design only (prices 24 November 2026) | Three plans for a 10–20 L single-vessel recirculating mash on a 16 A / 230 V socket, each with a spec sheet, BOM and shopping list. Nothing here is a wiring certificate. |
| ↳ [Lean](builds/diy-all-in-one/lean/spec.md) | Design, ready for review | DigiBoil factory controller + DigiMash + 6 W pump + DIY copper coil. No mains modification. Found prices R 9,255.10. |
| ↳ [Comfortable](builds/diy-all-in-one/comfortable/spec.md) | Design, ready for review | DigiBoil + DigiMash + 25 W pump + counterflow chiller + Brautomat32 / 40 A SSR. Electrician sign-off. Found prices R 12,817.12. |
| ↳ [From scratch](builds/diy-all-in-one/from-scratch/spec.md) | **Design for review, not validated** | Fabricated malt pipe, 2.2 kW weldless element, custom ESP32 control PCB (KiCad-ready netlist table). Found prices R 9,461.56 plus unpriced element, sheet and PCB. |

## Planned index sections

These folders are not created yet. They will collect short, cited notes rather than full clones of upstream projects:

- **Controllers** — for example BrewBlox, CraftBeerPi 4, BrewPiLess, Brautomat32, and related Raspberry Pi / ESP32 stacks.
- **Sensors** — DIY hydrometers (iSpindel hardware, Gravitymon firmware), and bridges for commercial devices such as Tilt (TiltBridge).
- **Mash systems** — BIAB, RIMS, and HERMS layouts, including the all-in-one path above.

## Contributing

Add or update a build brief on a branch and open a pull request. Never push directly to `master`. See [`CONTRIBUTING.md`](../CONTRIBUTING.md).

# Display encode (instrument lighting showcase)

## Job

Emit display lighting PGNs from vendor Signal K paths. Policy (when to dim) lives in signalk-n2k-displays, not here.

## Already here

- Raymarine brightness: `electrical.displays.raymarine.<group>.brightness` (0–1) → PGN 126720 Display Brightness (`conversions/raymarineBrightness.js`).

## Add (one commit each)

| ID | Conversion | SK path | PGN / fields | Test | Status |
| --- | --- | --- | --- | --- | --- |
| F1 | Navico backlight | `electrical.displays.navico.<group>.brightness` | 130845 key Backlight level, value = brightness × 100 | 0.5 → Value 50 | done (`conversions/navicoDisplays.js`) |
| F1 | Navico night mode | `electrical.displays.navico.<group>.nightMode.state` | 130845 key Night mode, 4 = night, 2 = day | 1 → Value 4 | done |
| F1 | Navico night color | `electrical.displays.navico.<group>.nightModeColor` | 130845 key Night mode color, 0–4 red…magenta | `green` → Value 1 | done |
| F2 | Raymarine color | `electrical.displays.raymarine.<group>.color` | 126720 Display Color | `red/black` → Color Red/Black | done (`conversions/raymarineDisplayColor.js`) |

Follow the group-mapping options pattern in `raymarineBrightness.js`. Do not regress that conversion.

Native scales and palettes: n2k-displays [ADR 0001](https://github.com/htool/signalk-n2k-displays/blob/showcase/instrument-lighting/docs/adr/0001-intent-and-actuation-paths.md) and [ADR 0003](https://github.com/htool/signalk-n2k-displays/blob/showcase/instrument-lighting/docs/adr/0003-palettes-are-device-native.md). Encode ownership: [ADR 0004](https://github.com/htool/signalk-n2k-displays/blob/showcase/instrument-lighting/docs/adr/0004-converter-owns-n2k-encode.md).

Out of scope: policy, webapp, simpleCan, HEX, Garmin.

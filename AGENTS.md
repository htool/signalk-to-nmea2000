# Agents

This plugin converts Signal K to NMEA 2000 (canboatjs). Plugins should write paths; this plugin encodes.

## Display lighting (showcase)

Navico/B&G and Raymarine display encode is in scope for branch `showcase/instrument-lighting`.

Read:

1. [docs/display-encode.md](docs/display-encode.md)
2. Upstream lighting contract: [htool/signalk-n2k-displays](https://github.com/htool/signalk-n2k-displays) `docs/adr/` and `docs/features.md` (F1, F2)
3. Existing pattern: `conversions/raymarineBrightness.js` (input 0.85 → Brightness 85)
4. Then `conversions/` — do not import signalk-server `src/`

Do not add HEX. Do not use simpleCan here. Tests: expected vs produced n2k JSON in the conversion `tests` array.

HypnoLog server TODO list
================================

- Write API documentation (JSON Schema?)
- Validate JSON requests

Visualizers:
- Let visualizers reuse code: override, call base, inheritance, contain each
  other, pass element to callback and then reuse the element and modify it,...?
- In visualizers: avoid repeat on code such: adding tags class, append tags
  elements, append variable name, ... 
- Load visualizers dynamically form folder

windows:
- support mutli-window logging.
- support async session logging.
- refactor WindowFilter: design wise, see TODOs in code. Rename to Tag filter (?)
- refactor everything related to watch section (separate module)

Design:
- use Require.js or something similar to handle all those JS file

CSS bugs:
- Tags element should be top-right aligned in each line (now it's bottom-right)

UI:
- Display warning when pressing F5 "Are you sure? you will lose your log data"
- Support offline work (don't load css files from the web)
- Dark theme (and theme selection button)

Other:
- Treat tags case-insensitive way ("Service" and "service" should be the same) (but think about CamelCase tags)


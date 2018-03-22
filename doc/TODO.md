HypnoLog Server TODO List
================================

## TOP
- Easy Visualizers adding and managing
    - Re-think about require/webpackfor Hypnolog client-side
    - support dependencies (css, json fiels)
- handle visualizers errors (also, missing js/css files)
- Improve UI
    - Don’t auto scroll down when not on bottom (like in Whatsapp)
    - Add side scroll indication if new lines at bottom (like in Whatsapp)


## MORE

### Server API:
- Consider adding tags and variable name as part of the API
- Add session opening message (given name, api version, some other data as application name...) (multi-session debug?)

### Visualizers:
- Let visualizers reuse code: override, call base, inheritance, contain each
  other, pass element to callback and then reuse the element and modify it,...?
- In visualizers: avoid repeat on code such: adding tags class, append tags
  elements, append variable name, ... 
- Load visualizers dynamically form folder (json config file?)
- let user apply custom CSS for his visualizers
- handle visualizers errors (also, missing js/css files)
- consider should display() return bool
- use nice JSON visualizer for default objects
- Visualization for array of any type (will use sub visualizers?)

### Windows:
- Load windows dynamically form folder (json config file?)
- refactor WindowFilter: design wise, see TODOs in code. Rename to Tag filter (?)
- refactor WindowFilter: think a way tags menu UI will no be depended on DOM
- add simple console text window (and simple text visualizer?) (?)

### Client-side Core:
- use Require.js or something similar to handle all those JS file

### UI:
- Don’t auto scroll down when not on bottom (like in Whatsapp)
- Add side scroll indication if new lines at bottom (like in Whatsapp)
- Add Jump to "session start" button (on side scroll)
- Display warning when pressing F5 "Are you sure? you will lose your log data"
- Add reset button (with keyboard Ctrl-C shortcut, and "Are you sure?")
- Dark theme (and theme selection option)
- Hide/fold sessions
- enable reset on new session (or display only last session)
Extra:
    - add extra info about each log message (time stamp,..)
    - enable stat important message
    - support adding notes about specific messages

### Server:
- Handle invalid messages (not json, don't mind about HypnoLog-API (?) )
- mind not using express
- more configuration about max message size, port
- support config file

### Bugs:
CSS Bugs:
- support adding notes about specific messages
- Tags element should be top-right aligned in each line (now it's bottom-right)


## Other Features:
- TagsFIlter: Treat tags case-insensitive way ("Service" and "service" should be the same) (but think about CamelCase tags)
- Reorganize project folders. Create folder for user configs, windows,
  visualizer,...
- support async session logging. Support easy way to debug few running
  programmes at the same time (use case: server with few clients).
- Support exporting all log to a file
- Support saving log to a file (or local storage ?)



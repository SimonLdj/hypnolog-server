HypnoLog Server TODO List
================================

## TOP
- set new top TODO's

## MORE

### Server API / Guidelines:
- Consider adding tags and variable name as part of the API
- Add session opening message (given name, api version, some other data as application name...) (multi-session debug?)
- document about `/status` query
- write some guidelines for how language-library should behave, for
  example what to do when server is off (provide alternative method), what to do
  when error occurred, when to stop logging, etc.

### Visualizers:
- handle visualizers run time errors (fall back to next visualizer, report to
  user)
- Don't block while heavy visualizers creating elements (but maintain log order,
  create place-holder element?)
- all system-core visualizers CSS class should be separated form main css file.
  also make sure css-class do not override each other.
- consider should display() return bool
- Visualization for array of any type (will use sub visualizers?)
- make submodule for most of the Visualizers (to be as Visualizers store). Keep
  only the most basic and lightweight visualizer in main repo.

### Windows:
- Load windows dynamically form config file (like visualizer)
- make the config be both for windows and Visualizers
- Each window should use it's own CSS class names, and in its own file (like
  Visualizers)
- refactor WindowFilter: design wise, see TODOs in code. Rename to Tag filter (?)
- refactor WindowFilter: think a way tags menu UI will no be depended on DOM
- add simple console text window (and simple text visualizer?) (?)
- add template window and maybe some other examples of what can be done with
  windows.


### Client-side Core:
- reorder files/folders (separate user files/core files)
- rename `javascripts` folder name.

### UI:
- Add indication if new lines at bottom, but been unseen (when not scrolled to
  bottom, like in Whatsapp)
- Add Jump to "session start" button (with the new-unseen-lines indication)
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
- Tags element should be top-right aligned in each line (now it's bottom-right)


## Other Features:
- TagsFilter: Treat tags case-insensitive way ("Service" and "service" should be the same) (but think about CamelCase tags)
- Reorganize project folders. Create folder for user configs, windows,
  visualizer,...
- support async session logging. Support easy way to debug few running
  programmes at the same time (use case: server with few clients).
- Support exporting all log to a file
- Support saving log to a file (or local storage ?)



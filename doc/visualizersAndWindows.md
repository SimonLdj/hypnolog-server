Visualizers and Windows
=======================


# How to add a Visualizer

1. Write you own Visualizer, see
   [`templateVisualizer.js`](/public/javascripts/visualizers/templateVisualizer.js)
   as en example.
2. Edit [configuration file](#Configuration-file) to load your Visualizer.

See [How to add a Visualizer](doc/howToAddVisualizer.md) guide for detailed example.

# How to add a Window

*TODO: This is not supported yet, but basicaly this should be like a
Visualizer.*

# Configuration file

User configuration file should be located at `public/config.json`.
If user config file was not found, default file configuration will be used,
which is located at `public/default-config.json`. This file can be user also as
an example for you custom user config file.

## Configuration options

Modify the `visualizers` key to add or remove Visualizers to use.

*TODO: config file now control which Visualizers are used for `defautl window`.
Later config file should be for controlling all windows and their Visualizers.*

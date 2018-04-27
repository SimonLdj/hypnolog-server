Adding Visualizers and Windows
=============================

`Visualizer`s and `Window`s are plug-in components in *HypnoLog*. They will
determine how to handle the incoming data and how to visualize it. See
[Documentation] for more details.

## How to add a Visualizer

1. Write you own Visualizer, see
   [`templateVisualizer.js`](/public/javascripts/visualizers/templateVisualizer.js)
   as en example.
2. Edit [configuration file][documentation#configurations] to load your Visualizer.

See [Add a Visualizers Example](#add-a-visualizers-example) guide for detailed
example.

## How to add a Window

*Note: This is not supported yet via configuration, but basicaly this should be
like a Visualizer.*

## Add a Visualizers Example

Let's assume we are debugging a code dealing with a lot of rectangles and we
want to add a Visualizer which will help us to visualize them.

First we create new file and call it `rectangleVisualizer.js`.
<!--TODO: complite this guide-->


[documentation]: HypnoLog-documentation.md


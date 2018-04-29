Adding Visualizers and Windows
=============================

[Visualizers][visualizers documentation] and [Windows][windows documentation]
are plug-in components in *HypnoLog*. They will determine how to handle the
incoming data and how to visualize it. See [Documentation] for more details.

## How to add a Visualizer

1. Write you own Visualizer, see [`templateVisualizer.js`] as en example.
2. Edit [configuration file][configurations documentation] to load your Visualizer.

See [Add a Visualizers Example](#add-a-visualizers-example) guide for detailed
example.

## How to add a Window

*Note: This is not supported yet via configuration, but basicaly this should be
like a Visualizer.*

## Add a Visualizers Example

Let's assume we are debugging a code dealing with a lot of rectangles and we
want to add a Visualizer which will help us to visualize them.

First we create a new file under `public/visualizers` and call it
`rectangleVisualizer.js`.

Our file should be a javascript module which implement 2 methods to be consider
a Visualizer: `canDisplay` and `display`. We can use [`templateVisualizer.js`] as a
template example.
```javascript
define(function (require) {
    let exports = {};
    exports.canDisplay = function(obj) {
    }
    exports.display = function(obj, callback) {
    }
    return exports;
});
```

Let's assume any rectangle object which is logged have 2 properties, `width` and
`height`. It looks something like that:
```
{ width: 60, height: 20 }
```

Now we can implement the visualization logic. Let's just use a simple
HTML `div` element to represent a rectangle.
```javascript
    exports.display = function(obj, callback) {
        let element = document.createElement("div");
        element.style.width = obj.data.width;
        element.style.height = obj.data.height;
        element.style.backgroundColor = "lightgreen";
        element.innerText = obj.data.width + "x" + obj.data.height;

        callback(element); // pass the new element to the callback
        return true; // return true, as yes, visualization was done successfully
    }
```

That was the most difficult part (not difficult right?).  
Now we just need to make some adjustments to make sure our Visualizer display
only what is needed. We implement the `canDisplay` method so it returns `true`
only for objects with the property `type` set to  `rect`:
```javascript
    exports.canDisplay = function(obj) {
        if (obj.type.toLocaleLowerCase() === "rect")
            return true;
        return false;
    }
```

Also we can add a name for the Visualizer so it will be easier to identify it:
```javascript
    exports.name = "Rectangle Visualizer";
```

Final step will be to add the Visualizer to the active visualizers list in the
configuration file.  
If you haven't created your own configuration file yet, create new file named
`config.json` under `public` folder. [Default configuration file] can be used
as example.
```json
{
    "visualizers": {
        "RectangleVisualizer": "visualizers/rectangleVisualizer.js",
        "DefaultVisualizer": "javascripts/visualizers/defaultVisualizer.js"
    }
}
```
We also include the `DefaultVisualizer` to handle all other types of objects.

OK, our Visualizer is set and ready to use.

Start your HypnoLog server and let's log some rectangles!

(Assuming we are logging form other javascripts code)
```javascript
HL.log({ width: 90, height: 25}, "rect");
HL.log({ width: 40, height: 40}, "rect");
HL.log({ width: 430, height: 56}, "rect");
```

The full code of Rectangle Visualizers can found [here][`rectangleVisualizer.js`].

[documentation]: HypnoLog-documentation.md
[visualizers documentation]: HypnoLog-documentation.md#visualizers
[windows documentation]: HypnoLog-documentation.md#windows
[configurations documentation]: HypnoLog-documentation.md#configurations
[`templateVisualizer.js`]: ../public/javascripts/visualizers/templateVisualizer.js
[Default configuration file]: ../public/default-config.json
[`rectangleVisualizer.js`]: rectangleVisualizer.js

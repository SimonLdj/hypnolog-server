HypnoLog Documentation
============================

*HypnoLog* aims to be the single tool for visualizing all you data from any
platform.
<!--TODO: write about data Visualization agnostic-->
This is done by the following described architecture.

# Architecture

Logging with HypnoLog done by sending HTTP requests to HypnoLog, therefor it is
possible to log from any language/technology/environment as log as it possible
to send HTTP request from it.

Second step is to view the logged data, this is done by accessing the web UI
using the browser. The browser is simple receiving the data from the same
HypnoLog server.

![alt text](/doc/images/architecture.png "HypnoLog Architecture")

In the most simple scenario all 3 parts (logging code, HypnoLog server, browser)
can run on the same machine.

# Visualization Architecture

*HypnoLog* aims to allow the user display any data in any possible way. Using
modern browser capabilities the possibilities are endless, especially compared
to old style console. 

*HypnoLog* do not provide some specific tools for visualize data. Instead,
*HypnoLog* is a framework to arrange already existing tools of data visualizations.

**Visualizer** is a component which can visualize some data. Those components
are easily added to HypnoLog (aka plugins). Visualizer is simply a javascripts
code which create HTML elements to visualize some data in the browser, and it
can use any already existing libraries to do so.

When data is logged, it is passed throw a chain of Visualizers until a
visualizer which accept to display the data is found.

![alt text](/doc/images/data-flow-chart.png "HypnoLog Visualization Architecture")

Only one Visualizer will be selected to display single *`data object`*.

**Data Object** is some data logged by single "log" action. Each `Data Object`
contain (a) the data which is logged and (b) type of that data. The type is
simply a string and is used to match applicable visualizer for the data.

Therefor each Visualizer specify 2 methods: Which types of data it can display,
and the display logic itself.

**Window**
<!--TODO write about windows-->
Note, adding windows throw configuration is not implemented yet.


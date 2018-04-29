HypnoLog Documentation
============================

*HypnoLog* aims to be the single tool for visualizing all your data from any
platform.  
*HypnoLog* doesn't care from which language you log or how you would like to
visualize your data.  
*HypnoLog* is a framework which allows you to do so as flexible as possible.

**Table of content**  
[Architecture](#architecture)  
[Visualizers](#visualizers)  
[Windows](#windows)  
[Configurations](#configurations)  
[Language Wrappers](#language-wrappers)  


## Architecture
Logging with *HypnoLog* done by sending HTTP requests to HypnoLog server,
therefor it is possible to log from any language/technology/environment as log
as it support sending HTTP requests.

Second step is to view the logged data, this is done by accessing the web UI
using the browser. The browser is simple receiving the data from the same
HypnoLog server.

![alt text](/doc/images/hypnolog-architecture.png "HypnoLog Architecture")

In the most simple scenario all 3 parts (logging code, HypnoLog server, browser)
can run on the same machine.

See about [Language Wrappers](#language-wrappers) which make it easier to log
from specific language/technology/environment.

Each logging data sent to HypnoLog server by single logging action (or single
HTTP request) referred as **Data Object**. Each `Data Object` contain (a) the
data being logged and (b) type of that data. The type is simply a string and is
used to determine how to visualize the data. See [Server API].

## Visualizers
*HypnoLog* aims to allow the user display any data in any possible way. Using
modern browser capabilities the possibilities are endless, especially compared
to old style console. 

*HypnoLog* do not provide some specific tools for data visualizations. Instead,
*HypnoLog* is a framework to arrange already existing tools of data
visualizations (or your own) to display the logged data.

**Visualizer** is a component which can visualize some data. Those components
are easily added to HypnoLog (as plugins). Visualizer is simply a javascripts
code which create HTML elements to visualize some data in the browser, and it
can use any already existing libraries to do so.

When data is logged, it is passed throw a chain of Visualizers until a
Visualizer which accept to display the data is found.

![alt text](/doc/images/data-flow-chart.png "HypnoLog Visualization Architecture")

Only one `Visualizer` will be selected to display single `data object`.
Visualizer can specify which `data object`s they want to display, usually they
determine it by the `type` of the data.

Therefor each Visualizer specify 2 methods: Which types of data it can display,
and the display logic itself.

See [Adding Visualizers and Windows] for more details.

## Windows

Visualizers are used to determine how to visualize specific `data object`, but
to determine how to handle a collection (or stream) of `data object`s different
types of `Window`s can be defined.

The incoming data will be passed to all windows and each window will handle it
by its own inner logic.

For example, the `Default window` will perform the logic described above -
selecting first matching visualizer to display the data and appending each new
element under the previous as a log.

**Window** is a component which responsible for handling incoming `data
object`s. `Window`s can easily be added to HypnoLog (aka plugins).  *Note,
adding windows throw configuration is not implemented yet.*
<!--TODO: document this better when adding windows will be implemented-->

## Configurations

Configuration file used to easily control which visualizers and windows are
used.
*Note,* later it can be used to control more settings (server port,..).

User configuration file should be located at `public/config.json`. If user
config file was not found, default file configuration will be used, which is
located at [`public/default-config.json`](../public/default-config.json). This
file can be also used as an example for you custom user config file.

### Configuration options

*`visualizers`* key determine which Visualizers are used by the `Defautl
Window`. Each Visualizers represented by path to the script file.

*Note: config file now control which Visualizers are used for `Defautl window`.
Later config file should be used to controlling all windows and their Visualizers.*

## Language Wrappers

Logging in *HypnoLog* done by sending JSON HTTP requests to HypnoLog server. To
make logging effortless, use libraries for you development language which
implement and wrap all this logic into super simple functions.

- For **C#** use [HypnoLog-CSharp](https://github.com/SimonLdj/hypnolog-csharp)
- For **NodeJS** use [HypnoLog-NodeJS](https://github.com/SimonLdj/hypnolog-nodejs)
- For **Python** use [HypnoLog-Python ](https://github.com/SimonLdj/hypnolog-python)

No wrapper library for your language? Logging to *HypnoLog* is simply sending
an HTTP POST request with JSON message. See [server API]. Develop
your own and contribute!

See [Language Requirements] as a guideline for developing new Language Wrapper.


[Adding Visualizers and Windows]: AddingVisualizersAndWindows.md
[Language Requirements]: LanguageRequirements.md
[Server API]: api-doc.md

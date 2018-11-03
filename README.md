HypnoLog
==========================
*~ Get Hypnotized While Logging ~*

*HypnoLog* is a modern output console which helps you visualize your application
  data while debugging or logging. From any environment, in any languages.

Forget about those black text-based console debug-printing like in the 70's:
![alt text](/doc/images/hypnolog-compared-to-cmd.png "HypnoLog UI screenshot")

## Features
- **Log from any language**/technology/environment (all you need is HTTP
  support). See [Language wrappers].
- **Visualize any data in any way**. Use existing or add your own visualization.
  It's a web application, do everything possible in a web browser and use any
  existing visualization libraries. Read more about [Visualizers][visualizers
  documentation].  

## Example
Code example (this is Python, but see [how to log](#how-to-log) in any other
language):
```python
import hypnolog as HL

HL.log('Hello HypnoLog from Pyhton!');

import numpy
npArray = 1 + numpy.sin(2 * numpy.pi * numpy.arange(0.0, 2.0, 0.01))
# log numbers array as plot
HL.log(npArray.tolist(), 'plot');

np2dArray = numpy.arange(-50, 50, 1).reshape(10,10);
# log 2d array as heatmap
HL.log(np2dArray.tolist(), 'heatmap');
```

## Why do I need this?
- You're developing an application with rich data and while debugging you want
  to view you data as image/graph/map/whatever and not as
  long-unreadable-block-of-text.
- You don't want to waste precious time on developing your own debugging tools.
- You're working with multiple end points and you need to see all of their
  output in one centralized place.
- You're working with multiple languages/technologies and you want one
  debug/logging visualization tool to rule them all.
- You're tired of those boring black and white text consoles with a buffer
  memory of a fish, which close in your face just when you need them, and
  generally speaking, have a user experience of a cave man...

## How does it work
Easy. *HypnoLog* sends the logged data/objects from your application as JSON
HTTP requests to HypnoLog server. HypnoLog server sends it to the web browser.
Web browser displays the data as you wish. You see your logged data - visualized
and shining as you want. Read more in the full [Documentation].

## Usage

### Setup HypnoLog server
This is a [Node.js](https://nodejs.org/en/) module available through the [npm
registry](https://www.npmjs.com/).  
Before installing, [download and install Node.js](https://nodejs.org/en/download/).  
Then, installation via `npm`:
```bash
$ npm install -g hypnolog-server
```
This will install `hypnolog-server` globally so that it may be run from the
command line.

### Start HypnoLog server
- Run `hypnolog-server [port]` (default port is `7000`)
- Open [`http://127.0.0.1:7000/client.html`](http://127.0.0.1:7000/client.html)
  in your browser (Suggested, Google Chrome)
- Log from your application

### How to Log
Logging in *HypnoLog* done by sending JSON HTTP requests to HypnoLog server. To
make logging effortless, use libraries for you development language which
implement and wrap all this logic into super simple functions.

For example, logging array of numbers in C# as a graph (plot):
```csharp
HL.Log(new []{1, 2, 3}, "plot");
```

- For **C#** use [HypnoLog-CSharp](https://github.com/SimonLdj/hypnolog-csharp)
- For **NodeJS** use [HypnoLog-NodeJS](https://github.com/SimonLdj/hypnolog-nodejs)
- For **Python** use [HypnoLog-Python ](https://github.com/SimonLdj/hypnolog-python)

No wrapper library for your language? Logging to *HypnoLog* is simply sending
an HTTP POST request with JSON message. See [Language wrappers]. Develop your own and
contribute!

## War stories (as continue to "Why do I need this?") :
- Debugging image processing algorithm written in C# with Emgu CV, running as a
  service on Windows machine.  
  Without HypnoLog: looking at huge arrays of numbers with Visual Studio DataTip
  tool, or messy console output.  
  With HypnoLog: viewing color histograms, output image at any step and any
  other data as graphs.  
- Debugging Localization algorithm running on a remote robot with real time
  laser sensors, written in Java on Linux.  
  Without HypnoLog: wasting time writing Java code to draw images of the map,
  saving each snapshot as a file, deal with folder with hundreds of file and
  open each one manually.  
  With HypnoLog: viewing the map of the room, with robot's laser and algorithm's
  prediction, all at real time in the browser.  
- Keep track of communication between Client and multiple distributed Servers
  written in C# on Windows. The client sends multiple requests to each server,
  and needs them all to complete the task. Keeping track of which of the 30
  distributed servers failed the task by reading each log file can be nightmare.  
  Without HypnoLog: missing the single error line in thousands line long console
  output (which then get lost as the console buffer big enough) or looking for
  same error message in hundreds of log files.  
  With HypnoLog: log all the servers to same HypnoLog at the developer machine,
  view all output at the same browser window, and just Ctrl+F for the needed
  message (or filter using tags). 
- Debugging headless browser bot written in Python on Windows.  
  Without HypnoLog: writing code to saving browsers snapshots as images, while
  trying to keep some order by naming each image and fill up some folder with
  output images.  
  With HypnoLog: just log each snapshot directly to HypnoLog, view it one after
  the other with text notes in the browser.
- Your war story here...

##### Notes
- Web UI tested only on Google Chrome browser.


[documentation]:                    doc/HypnoLog-documentation.md
[visualizers documentation]:        doc/HypnoLog-documentation.md#visualizers
[language wrappers]:                doc/HypnoLog-documentation.md#language-wrappers
[server api]:                       doc/api-doc.md

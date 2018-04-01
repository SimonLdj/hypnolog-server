HypnoLog
==========================
*Get Hypnotized While Logging*

*HypnoLog* lets you fast and easily visualize your application data/objects while debugging. From any environment, in any language. Forget about those black text-based console debug-printing back from the 70's. 

## Why do I need this?
- You're developing an application with reach data and while debugging you want to view you data as image/graph/map/whatever and not as long-unreadable-block-of-text. 
- You don't want to waste precious time on developing your own debugging tools.
- You're working with multiple end points and you need to see all of their output in one clear place.
- You're working with multiple languages/technologies and you want one debug/logging visualization tool for them all.
- You're tired of those boring black n white text consoles with a buffer memory of a fish, which close in your face just when you need them and generally speaking, have a user experience of a cave man...

## Example
Write this (Python):
```python
import hypnolog as HL

HL.log('Hello HypnoLog from Pyhton!');

import numpy
npArray = 1 + numpy.sin(2 * numpy.pi * numpy.arange(0.0, 2.0, 0.01))
HL.log(npArray.tolist(), 'plot');

locations = [ ['Lat', 'Long', 'Name'], [37.4232, -122.0853, 'Work'], [37.4289, -122.1697, 'University'], [37.6153, -122.3900, 'Airport'], [37.4422, -122.1731, 'Shopping'] ];
HL.log(locations, 'GoogleMaps');
```

See this:
![alt text](/doc/images/screenshot_hypnolog-python-example.png "HypnoLog UI screenshot")

## How does it works
Easy. *HypnoLog* sends the logged data/objects from your application as JSON HTTP requests to HypnoLog server. HypnoLog server sends it to the web browser. Web browser display the data as you wish. You see your logged data - visualized and shining as you want. Read more about [Architecture](/doc/architecture.md).

## Features:
- Log from any language/technology/environment (all you need is HTTP support).
- Customize and add your own visualization. It's a web application: use any existing tool or write your own. Read more about [Visualizers and Windows](/doc/visualizersAndWindows.md).

## Usage

### Setup HypnoLog server
- Install [NodeJS](https://nodejs.org/) on your machine
- Clone hypnolog-server repo: `git clone https://github.com/SimonLdj/hypnolog-server.git`
- `cd hypnolog-server`
- Install dependencies: `npm install`

### Start HypnoLog server
- Run `npm start` in repo directory
- Open [`http://127.0.0.1:7000/client.html`](http://127.0.0.1:7000/client.html) in your browser (Suggested, Google Chrome)
- Log from your application

### How to Log
Logging in *HypnoLog* done by sending JSON HTTP requests to HypnoLog server. To make logging effortless use libraries for you development language which implement and wrap all this logic into super simple functions.

For example, logging array of numbers in C# as a graph (plot):
```csharp
HL.Log(new []{1, 2, 3}, "plot");
```

- For **C#** use [HypnoLog-CSharp](https://github.com/SimonLdj/hypnolog-csharp)
- For **NodeJS** use [HypnoLog-NodeJS](https://github.com/SimonLdj/hypnolog-nodejs)
- For **Python** use [HypnoLog-Python ](https://github.com/SimonLdj/hypnolog-python)

No wrapper library for your language? Logging to *HypnoLog* is simply sending HTTP POST request with JSON message. See [server API](/doc/api-doc.md). Develop your own and contribute!

## War stories (as continue to "Why do I need this?") :
- Debugging Image processing algorithm written in C#  with Emgu CV, running as a service on Windows machine.
What was possible: viewing color histograms, output image at any step and any other data as graphs.
Instead of: looking at huge arrays of numbers with Visual Studio DataTip tool, or messy console output.
- Debugging Localization algorithm running on a remote robot with real time laser sensors, written in Java on Linux.
What was possible: viewing the map of the room, with robot's laser and algorithm's prediction, all at real time.
Instead of: wasting time writing java code to draw images of the map, saving each snapshot as a file, deal with folder with hundreds of file and open each one manually.
- Keep track of communication between Client and multiple distributed Servers. The client sends multiple requests to each server, and needs them all to complete the task. Keeping track of which of the 30 distributed servers failed the task by reading each log file can be nightmare.
Instead of: missing the single error line in thousands line long console output (which then get lost as the console buffer big enough) or looking for same error message in hundreds of log files.
What was possible: log all the servers to same HypnoLog, view all output at the same browser window, and just Ctrl+F for the needed message (or filter using tags). 
- Debugging headless browser bot written in Python on Windows.
Instead of: writing code to saving browsers snapshots as images, while trying to keep some order by naming each image and fill up some folder with output images.
What was possible: just log each snapshot directly to HypnoLog, view it one after the other with text notes in the browser.
- Your war story here...

##### Notes
- Web UI tested only on Google Chrome browser.


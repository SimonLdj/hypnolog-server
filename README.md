HypnoLog
==========================

*Get hypnotized While Logging*

# About
*HypnoLog* is a tool letting you easily create meaningful logs, helping you
debug and understand your application.



# Usage

### Requirements ###
Install `NodeJS` on you machine.

### Usage ###
- If it is the first time, run `npm install`
- Run `npm start`
- Open [`http://127.0.0.1:7000/client.html`](http://127.0.0.1:7000/client.html) in your browser
- Log from your application

### How to Log ###

Logging in *HypnoLog* done by sending logging requests to HypnoLog server (the one you start running by `run.sh`).

To make logging effortless from your application code use libraries for you development environment which implement and wrap all the communication with the HypnoLog server.

- For **C# .NET 4+** use [Hypnolog-csharp library](#)
- For **C# .NET 2-4** use [Hypnolog-csharp-dotnet2 library](#)
- For **NodeJS** use [Hypnolog-node](#)

For any other environment wrapper library can be developed. Sending log requests to HypnoLog server is not more than sending HTTP POST request with JSON message. See [server API](#).

# Notes

- Web UI tested only on Google Chrome browser.


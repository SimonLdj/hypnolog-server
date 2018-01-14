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

Logging in *HypnoLog* done by sending logging requests to HypnoLog server (the one you start running by `npm start`).

To make logging effortless from your application code use libraries for you development environment which implement and wrap all the communication with the HypnoLog server.

- For **C# .NET 4+** use [Hypnolog-csharp library](https://github.com/SimonLdj/hypnolog-csharp)
- For **NodeJS** use [Hypnolog-nodejs](https://github.com/SimonLdj/hypnolog-nodejs)

For any other environment wrapper library can be developed. Sending log requests to HypnoLog server is simply sending HTTP POST request with JSON message. See [server API](/doc/api-doc.md).

### Notes

- Web UI tested only on Google Chrome browser.


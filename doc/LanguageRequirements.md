Language Requirements List
===================================

Guide lines and requirements for when implementing HypnoLog library for a new language.

## Basic Requirements

- Support basic logging API
    - *TBD*
    - log data types: `string`, `numbers array/list`, `custom objects`
    - Methods: `log(object)`
- Pack as library
- Don’t disturb natural code flow
    - Handle when server is down
        - Notify the user, but don't stop proggram (Handle exceptions)
        - Fallback: log to default console
- Write readme file
    - Introduction
    - Basic usages examples
    - How to install
- In code documentation
- Support config (via code)
    - Set server `ip`/`port`


## Not basic features

*Priority marks:* `A` - Hight ,`B` - Medium, `C` - Low

- (`A`) Easy redirect all existing default output
- Support tagging log messages
- Good initialization
    - reuse objects, make sure what's possible created only once
    - initialize only when needed
    - support implicit initialization (at the begging of the program)
    - mind non-blocking initialization (async)
- Session start message (as program starts, or on first message)
- Session end message
- Support both Async and Sync logging
- Error handling
    - By config, enable not quite error handling (event stop program)
    - By config, provide other fallback options (like into file)
- Configuration
    - (`A`) Support config as file
        - *TBD* under Hypnolog standard (dotfile style)
    - Log only under some condition (Debug mode, Development Flag, etc.)
- Performance
    - See Good initialization
    - Manage some messages queue,  (?)
    - Non-blocking server communication, but maintain synced queue
    - Handle failed requests, resend for X times (?)
- Auto type suggestion: will help determine logged object type
    - for simple types like (string/number/other-object)
    - Extensibility for other (and user custom) types
- Document all advanced features


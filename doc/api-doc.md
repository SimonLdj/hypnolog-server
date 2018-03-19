HypnoLog Server API
==================================

To log some data, simply send HTTP POST request to HypnoLog Server at  `127.0.0.1:7000/logger/in` with content such as this:
```
    {
        "data": "Hello HypnoLog!",
        "type": "string"
    }
```

Sending HTTP request can be done from any language that has HTTP library, this
means HypnoLog can be used almost in any language.

cURL example:
```
    curl -H "Content-Type: application/json" -X POST -d '{ "data": "Hello from cURL!", "type": "string" }' http://127.0.0.1:7000/logger/in
```

Note, header `Content-type: application/json` should be set.
For more logging options see examples below, or read this [schema](hypnolog-data-obejct-schema.json).


### Examples

Logging simple number:
```
    {
        "data": 5,
        "type": "number"
    }
```

Logging simple string:
```
    {
        "data": "Hello HypnoLog!",
        "type": "string"
    }
```

Logging array of numbers:
```
    {
        "data": [4, 65, 2, 6, 4, 4, 3],
        "type": "numbersArray"
    }
```

Logging complex object:
```
    {
        "data": {
            "BrandName": "Seat",
            "ModelName": "Mii",
            "Engine": {
                "NumberOfCylinders": 3,
                "Acceleration": 14.4
            },
            "Color": "Red"
        },
        "type": "car"
    }
```


*(Experimental)* Logging with tags:
```
    {
        "data": "199",
        "type": "number",
        "tags": ["users", "network"],
    }
```

*(Experimental)* Logging with variable name:
```
    {
        "data": "2018",
        "type": "number",
        "name": "current_year",
    }
```


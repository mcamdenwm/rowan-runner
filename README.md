# Rowan Runner

This application consumes POST requests with the following shape:

```
    {
        prog: Array,
        response_envelope: Object,
    }
```

Rowan is executed against `prog` and applied `response_envelope`, and result is returned.

## Getting started

```
yarn ; yarn start
```
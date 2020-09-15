<h1 align="left">micro-ap</h1>

tiny arg parser

***
# Installation

```bash
$ npm i micro-ap
```

# About
micro-a is a small and opinionated argument parser library without any additional dependencies.

# Functions
## flag(flag, name, fallback = false)
Extract flag arguments
* `flag` (string); one char as flag e.g. `-f`
* `name` (string); full name of a flag e.g. `--file`
* `fallback` (string); default value

## command(name, fallback = false)
Extract command arguments
* `name` (string); name of the command e.g. `install`
* `fallback` (string); default value

## get()
Returns the parsed arguments as an object

# Examples
```JavaScript
const parser = require('micro-ap');

// simple
// node index.js install test --verbose
parser(process.argv)
    .flag('v', 'verbose')
    .command('install')
    .get() // returns {"verbose": true, "install": "test"}
;

// complex
// node index.js install foo -o console -f one.js two.js three.js -f four.js
parser(process.argv)
    .command('install')
    .flag('f', 'file')
    .flag('o', 'output')
    .flag('v', 'verbose', true)
    .get() // returns {"install": "test", "verbose": true, "output": "console", "file": ["one.js", "two.js", "three.js", "four.js"]}
;
```

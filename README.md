<h1 align="left">micro-r</h1>

tiny arg parser

***
# Installation

```bash
$ npm i micro-a
```

# About
micro-a is a small and opinionated argument parser library without any additional dependencies.

# Functions
## flag(flag, name)
Extract flag arguments
* `flag` (string); one char as flag e.g. `-f`
* `name` (string); full name of a flag e.g. `--file`

## command(name)
Extract command arguments
* `name` (string); name of the command e.g. `install`

## get()
Returns the parsed arguments as an object

# Examples
```JavaScript
const parser = require('micro-a');

// simple
// node index.js install test --verbose
parser(process.argv)
    .flag('v', 'verbose')
    .command('install')
    .get() // returns {"verbose": true, "install": "test"}
;

// complex
// node index.js install foo -v -o console -f one.js two.js three.js -f four.js
parser(process.argv)
    .command('install')
    .flag('f', 'file')
    .flag('o', 'output')
    .flag('v', 'verbose')
    .get() // returns {"install": "test", "verbose": true, "output": "console", "file": ["one.js", "two.js", "three.js", "four.js"]}
;
```

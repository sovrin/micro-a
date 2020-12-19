<h1 align="left">micro-ap</h1>

tiny arg parser

***
# Installation

```bash
$ npm i micro-ap
```

# About
[![npm version][npm-src]][npm-href]
[![types][types-src]][types-href]
[![size][size-src]][size-href]
[![coverage][coverage-src]][coverage-href]
[![Dependencies][dep-src]][dep-href]
[![devDependencies][devDep-src]][devDep-href]
[![License][license-src]][license-href]

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

[npm-src]: https://badgen.net/npm/v/micro-ap
[npm-href]: https://www.npmjs.com/package/micro-ap
[size-src]: https://badgen.net/packagephobia/install/micro-ap
[size-href]: https://badgen.net/packagephobia/install/micro-ap
[types-src]: https://badgen.net/npm/types/micro-ap
[types-href]: https://badgen.net/npm/types/micro-ap
[coverage-src]: https://coveralls.io/repos/github/sovrin/micro-ap/badge.svg?branch=master
[coverage-href]: https://coveralls.io/github/sovrin/micro-ap?branch=master
[dep-src]: https://badgen.net/david/dep/sovrin/micro-ap
[dep-href]: https://badgen.net/david/dep/sovrin/micro-ap
[devDep-src]: https://badgen.net/david/dev/sovrin/micro-ap
[devDep-href]: https://badgen.net/david/dev/sovrin/micro-ap
[license-src]: https://badgen.net/github/license/sovrin/micro-ap
[license-href]: LICENSE
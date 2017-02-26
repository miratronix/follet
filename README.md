# follet
A simple programmatic markdown document generation library.

## Installation
Install with NPM: `npm install follet --save-dev`

## Usage
```javascript
const follet = require('follet');

// Generate a markdown file from the JSDocs in the src directory (returns a promise)
follet.jsdoc.generateMd('src/*', 'jsdoc.md');

// Generate a markdown file from a swagger spec (returns a promise)
follet.swagger.generateMd(require('spec.json'), 'swagger.md');
```

## Markdown Flavours
By default, follet generates github flavoured markdown. Th change to bitbucket, simply do the following:
```javascript
const follet = require('follet').setMdFlavour('bitbucket');
```

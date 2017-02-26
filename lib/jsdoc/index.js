'use strict';

const fs = require('fs');
const _ = require('lodash');
const jsdoc2md = require('jsdoc-to-markdown');
const dmdBitbucket = require('dmd-bitbucket')();

const JSDoc = {

    options: {
        configure: `${__dirname}/config.json`,
        partial: [`${__dirname}/partials/**/*.hbs`],
        separators: true
    },

    setMdFlavour: (flavour) => {
        if (flavour === 'bitbucket') {
            JSDoc.options = _.assign(JSDoc.options, {
                partial: [dmdBitbucket.partial, ...JSDoc.options.partial],
                helper: dmdBitbucket.helper
            });
        }
    },

    generateMd: (files, outputPath) => {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFileSync(outputPath, jsdoc2md.renderSync(_.assign(JSDoc.options, { files })));
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
};

module.exports = JSDoc;

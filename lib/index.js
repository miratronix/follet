'use strict';

const jsdoc = require('./jsdoc/index.js');
const swagger = require('./swagger/index.js');

const Follet = {

    jsdoc,
    swagger,

    setMdFlavour: (flavour) => {
        jsdoc.setMdFlavour(flavour);
        swagger.setMdFlavour(flavour);
        return Follet;
    }
};

module.exports = Follet;

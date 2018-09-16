'use strict';

const fs = require('fs');
const _ = require('lodash');
const swaggerMd = require('swagger-md').default;

const requestParameter = (location, type, required, name, description) => {
    return {
        name,
        description,
        required,
        type,
        in: location
    };
};

const requestPrimatives = (location, required) => {
    return {
        string: requestParameter.bind(null, location, 'string', required),
        strings: requestParameter.bind(null, location, 'string[]', required),
        integer: requestParameter.bind(null, location, 'integer', required),
        integers: requestParameter.bind(null, location, 'integer[]', required),
        boolean: requestParameter.bind(null, location, 'boolean', required),
        booleans: requestParameter.bind(null, location, 'boolean[]', required),
        number: requestParameter.bind(null, location, 'number', required),
        numbers: requestParameter.bind(null, location, 'number[]', required),
    };
};

const requestParameters = (required) => {
    return {
        query: requestPrimatives('query', required),
        body: requestPrimatives('body', required),
        path: requestPrimatives('path', required)
    };
};

const responseValue = (type, description) => {
    return {
        description,
        type
    };
};

const responseSchema = (type, description, schema) => {
    return _.assign(
        { type, description },
        type === 'object' ? { properties: schema, required: _.keys(schema) } : { items: schema }
    );
};

const Swagger = {

    setMdFlavour: (flavour) => {
        if (flavour === 'bitbucket') {
            // Override bullet point indentation for schemas and the table of contents
            require('swagger-md/dist/generators/schema-generator.js').default.createSchemaList = require('./bitbucket/schema.generator.js');
            require('swagger-md/dist/generators/toc-generator.js').default.generateTableOfContents = require('./bitbucket/toc.generator.js');

        }
    },

    generateMd: (spec, outputPath) => {
        return swaggerMd.convertToMarkdown(spec)
            .then((md) => {
                fs.writeFileSync(outputPath, md);
            });
    },

    definitions: {

        request: {
            parameter: requestParameters(false),
            requiredParameter: requestParameters(true)
        },

        response: (description, schema) => {
            return {
                description,
                schema
            };
        }
    }
};

Swagger.definitions.response.object = responseSchema.bind(null, 'object');
Swagger.definitions.response.array = responseSchema.bind(null, 'array');
Swagger.definitions.response.string = responseValue.bind(null, 'string');
Swagger.definitions.response.integer = responseValue.bind(null, 'integer');
Swagger.definitions.response.long = responseValue.bind(null, 'long');
Swagger.definitions.response.byte = responseValue.bind(null, 'byte');
Swagger.definitions.response.float = responseValue.bind(null, 'float');
Swagger.definitions.response.double = responseValue.bind(null, 'double');
Swagger.definitions.response.boolean = responseValue.bind(null, 'boolean');
Swagger.definitions.response.date = responseValue.bind(null, 'date');
Swagger.definitions.response.dateTime = responseValue.bind(null, 'dateTime');

module.exports = Swagger;

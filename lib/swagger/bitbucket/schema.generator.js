'use strict';

const typePicker = require('swagger-md/dist/generators/type-picker.js').default;

const nextIndentation = (indentation) => {
    return `${indentation}    `;
};

const formatSchemaType = (schema) => {
    const type = typePicker.extractType(schema);
    if (type === 'string' && schema.enum) {
        return `(${type}: ${schema.enum.join(', ')})`;
    }
    return `(${type})`;
};

const formatListItem = (name, schema, indentation, isOptional) => {
    const type = formatSchemaType(schema);
    const desc = schema.description ? ` ${schema.description}` : '';
    return `${indentation}* ${name}${name ? ' ' : ''}${type}${isOptional ? ' (optional)' : ''}${desc}`;
};

const recursiveAppendLines = (lines, name, schema, indentation, isOptional) => {
    lines.push(formatListItem(name, schema, indentation, isOptional));

    if (schema.type === 'object' && schema.properties) {
        Object.keys(schema.properties).forEach((key) => {
            const keyIsRequired = Array.isArray(schema.required) && schema.required.indexOf(key) >= 0;
            recursiveAppendLines(lines, key, schema.properties[key], nextIndentation(indentation), !keyIsRequired);
        });
    } else if (schema.type === 'array' && schema.items) {
        recursiveAppendLines(lines, '', schema.items, nextIndentation(indentation), false);
    }
};

module.exports = (schema) => {
    if (!schema.type && !schema.$ref) {
        return 'N/A';
    }
    const lines = [];
    recursiveAppendLines(lines, '', schema, '', false);
    return lines.join('\n');
};

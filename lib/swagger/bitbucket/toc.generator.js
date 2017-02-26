'use strict';

const linkToHeader = require('swagger-md/dist/generators/link-to-header').default;

module.exports = (pathsHeader, paths) => {
    const tocArray = [`* ${linkToHeader(pathsHeader)}`];

    Object.keys(paths).forEach((path) => {
        const methods = paths[path];
        Object.keys(methods).forEach((method) => {
            const header = `${method.toUpperCase()} ${path}`;
            const deprecated = methods[method].deprecated ? ' _`deprecated`_' : '';
            tocArray.push(`    * ${linkToHeader(header)}${deprecated}`);
        });
    });

    return tocArray.join('\n');
};

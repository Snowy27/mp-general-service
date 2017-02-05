'use strict';

const _ = require('lodash');

module.exports = function createParsedMessage (route, request) {
    let parsedMessage = _.pick(route, ['service', 'version', 'cmd', 'method']);
    parsedMessage = _.assign(parsedMessage, request.params);
    parsedMessage = _.assign(parsedMessage, request.query);
    parsedMessage = _.assign(parsedMessage, request.payload);

    return parsedMessage;

};

'use strict';

module.exports = function createPattern (route) {
    let pattern = 'service:' + route.service;
    pattern += ',version:' + route.version;
    pattern += ',cmd:' + route.cmd;
    return pattern;
};

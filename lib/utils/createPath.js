'use strict';
const _ = require('lodash');

module.exports = function createPath (route) {
    let path = '/' + route.service;
    path += '/' + route.version;
    if (route.params) {
        _.forEach(route.params, (param) => {
            path += '/{' + param + '}';
        });
    }
    path += '/' + route.cmd;
    return path;
};

'use strict';

module.exports = function createPath (route) {
    let path = '/' + route.service;
    path += '/' + route.version;
    path += '/' + route.cmd;
    return path;
};

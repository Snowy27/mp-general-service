'use strict';

module.exports = function createPath (route) {
    //Currently path for the endpoint has next structure:
    // /service_title/version/path
    let path = '/' + route.service;
    path += '/' + route.version;
    path += '/' + route.path;
    return path;
};

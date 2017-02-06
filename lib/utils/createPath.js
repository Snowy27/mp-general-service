'use strict';
const _ = require('lodash');


module.exports = function createPath (route) {
    //Currently path for the endpoint has next structure:
    // /service_title/version/[params]/cmd
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

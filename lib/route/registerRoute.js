'use strict';

module.exports = function registerRoute(route, server) {
    let self = this;

    self.addSenecaTask(route);
    self.addEndpoint(route, server);

};

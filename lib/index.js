'use strict';

const Chairo = require('chairo');
const Hapi = require('hapi');
const defaultConfig = require('./config');
const _ = require('lodash');
const Utils = require('./utils');
const Route = require('./route');
const BPromise = require('bluebird');

module.exports = Service;

function Service (serviceTitle, routes, specificConfig) {

    this.check = 'passed';

    let config = _.defaults(specificConfig, defaultConfig),
        server = new Hapi.Server({debug: {request: ['error']}}),
        self = this;

    server.connection({port: config.PORT, host: config.HOST});
    server.register(Chairo, (err) => {

        if (err) {
            throw err;
        }

        self.seneca = server.seneca;
        self.seneca.actAsync = BPromise.promisify(self.seneca.act, {context: self.seneca});

        _.forEach(routes, (route) => {
            let modifiedRoute = route;
            modifiedRoute.service = serviceTitle;

            self.registerRoute(modifiedRoute, server);
        });

        self.seneca.listen(config.SENECA_LISTEN_PORT);
        _.forEach(config.SENECA_CLIENT_PORTS, (port) => {
            self.seneca.client(port);
        });

    });

    server.start((err) => {
        if (err) {
            throw err;
        }

        console.log('Server running at: ', server.info.uri);
    });
}

Service.prototype.createPattern = Utils.createPattern;
Service.prototype.createPath = Utils.createPath;
Service.prototype.createParsedMessage = Utils.createParsedMessage;

Service.prototype.registerRoute = Route.registerRoute;
Service.prototype.addSenecaTask = Route.addSenecaTask;
Service.prototype.addEndpoint = Route.addEndpoint;

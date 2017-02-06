'use strict';

const Chairo = require('chairo');
const Hapi = require('hapi');
const defaultConfig = require('./config');
const _ = require('lodash');
const Utils = require('./utils');
const Route = require('./route');
const BPromise = require('bluebird');
const Validation = require('./validation');

module.exports = Service;

/**
 * This is the basic service that starts up hapi server and Seneca client with provided routes.
 * Example of usage:
 * let tutorialService = new Service('tutorial', [{method: 'GET', version: 'v1', cmd: 'help', params: ['lesson_id'], handler: helpHandle}], {
 *     PORT:3000,
 *     SENECA_LISTEN_PORT: 3001
 * });
 * This will create a Hapi server that will listen on port 3000, with the route GET /tutorial/v1/{lesson_id}/help
 * As well as a Seneca client, that will take port 3001
 * You can connect to this Seneca client from other services passing SENECA_CLIENT_PORTS: [3001] in the config.
 * After that you will be able to call this task with this.seneca.actAsync({service: 'tutorial', version: 'v1', method: 'GET', cmd: 'help'})
 * Both Hapi server and Seneca client retun response in the next form:
 * {
 *     result: "success|error",
 *     response: {...}
 * }
 * Additionaly, you can pass Joi validation schema to the route {method: 'GET', validation: {SCHEMA}, ...}
 */

function Service (serviceTitle, routes, specificConfig) {

    let config = _.defaults(specificConfig, defaultConfig),
        server = new Hapi.Server({debug: {request: ['error']}}),
        self = this;

    self.server = server;

    server.connection({port: config.PORT, host: config.HOST});
    server.register(Chairo, (err) => {

        if (err) {
            throw err;
        }

        self.config = config;
        self.seneca = server.seneca;
        self.seneca.actAsync = BPromise.promisify(self.seneca.act, {context: self.seneca});

        //Register routes in Hapi and Seneca
        _.forEach(routes, (route) => {
            let modifiedRoute = route;
            modifiedRoute.service = serviceTitle;
            self.registerRoute(modifiedRoute, server);
        });

    });
}

Service.prototype.startService = function startService() {
    let self = this;

    self.server.start((err) => {
        if (err) {
            throw err;
        }

        self.seneca.listen(self.config.SENECA_LISTEN_PORT);
        _.forEach(self.config.SENECA_CLIENT_PORTS, (port) => {
            self.seneca.client(port);
        });

        console.log('Server running at: ', self.server.info.uri);
    });
};

Service.prototype.createPattern = Utils.createPattern;
Service.prototype.createPath = Utils.createPath;
Service.prototype.createParsedMessage = Utils.createParsedMessage;

Service.prototype.registerRoute = Route.registerRoute;
Service.prototype.addSenecaTask = Route.addSenecaTask;
Service.prototype.addEndpoint = Route.addEndpoint;

Service.prototype.validateMessage = Validation.validateMessage;

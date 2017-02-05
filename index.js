'use strict';

const Service = require('./lib');
const BPromise = require('bluebird');

let getSong = function getSong (message) {
    return BPromise.resolve(message.random / message.notRandom);
};

let helpHandle = function helpHandle(message) {
    console.log('In the helper: ');
    return this.seneca.actAsync({
            service: 'search',
            version: 'v1',
            method: 'GET',
            cmd: 'song',
            random: 2000,
            notRandom: 5
        })
        .then(function(resp) {
            return resp / 2;
        });
};

let routes = [
    {
        method: 'GET',
        version: 'v1',
        cmd: 'song',
        handler: getSong
    }
];

let helperRoutes = [
    {
        method: 'GET',
        version: 'v1',
        cmd: 'help',
        handler: helpHandle
    }
];

let search = new Service('search', routes, {
    SENECA_LISTEN_PORT: 3001
});

let helper = new Service('helper', helperRoutes, {
    PORT:3002,
    SENECA_LISTEN_PORT: 3003,
    SENECA_CLIENT_PORTS: [3001]
});

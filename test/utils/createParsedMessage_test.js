'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const beforeEach = lab.beforeEach;
const should = require('should');
const Service = require('./../../lib');

describe('createParsedMessage tests', function() {
    let service,
        testRoute,
        testRequest;

    beforeEach((done) => {
        service = new Service('test', [], {});
        testRoute = {
            method: 'GET',
            version: 'v1',
            cmd: 'help',
            service: 'test',
            handler: function () {}
        };
        testRequest = {
            params: {
                key: 'value'
            },
            query: {
                keyInQuery: 'valueInQuery'
            },
            payload: {
                keyInPayload: 'valueInPayload'
            }
        };
        done();
    });

    it('Should create a parsed message from route and payload', (done) => {

        let parsedMessage = service.createParsedMessage(testRoute, testRequest);
        should.deepEqual(parsedMessage, {
            method: 'GET',
            version: 'v1',
            cmd: 'help',
            service: 'test',
            key: 'value',
            keyInQuery: 'valueInQuery',
            keyInPayload: 'valueInPayload'
        });
        done();
    });
});

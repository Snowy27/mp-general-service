'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const beforeEach = lab.beforeEach;
const should = require('should');
const Service = require('./../../lib');

describe('createPath tests', function() {
    let service,
        testRoute;

    beforeEach((done) => {
        service = new Service('test', [], {});
        testRoute = {
            method: 'GET',
            version: 'v1',
            cmd: 'getHelp',
            service: 'test',
            path: '{id}/help',
            handler: function () {}
        };
        done();
    });

    it('Should create a path from route', (done) => {

        let path = service.createPath(testRoute);
        should(path).be.equal('/test/v1/{id}/help');
        done();
    });
});

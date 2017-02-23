'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const beforeEach = lab.beforeEach;
const should = require('should');
const Service = require('./../../lib');

describe('createPattern tests', function() {
    let service,
        testRoute;

    beforeEach((done) => {
        service = new Service('test', [], {});
        testRoute = {
            method: 'GET',
            version: 'v1',
            cmd: 'getHelp',
            path: '{id}/help',
            service: 'test',
            handler: function () {}
        };
        done();
    });

    it('Should create a pattern from route', (done) => {

        let pattern = service.createPattern(testRoute);
        should(pattern).be.equal('service:test,version:v1,cmd:getHelp');
        done();
    });

});

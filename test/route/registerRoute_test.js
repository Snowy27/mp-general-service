'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const sinon = require('sinon');
const should = require('should');
const Service = require('./../../lib');

describe('registerRoute tests', function() {
    let service,
        sandbox = sinon.sandbox.create(),
        addSenecaTaskStub,
        addEndpointStub,
        testRoute,
        testServer;

    beforeEach((done) => {
        service = new Service('test', [], {});
        addSenecaTaskStub = sandbox.stub(service, 'addSenecaTask');
        addEndpointStub = sandbox.stub(service, 'addEndpoint');
        testRoute = {
            method: 'GET',
            version: 'v1',
            cmd: 'help',
            service: 'test',
            params: ['id'],
            handler: function () {}
        };
        testServer = {
            port: 3000
        };
        done();
    });

    afterEach((done) => {
        sandbox.restore();
        done();
    });

    it('Should add seneca task and an endpoint', (done) => {
        service.registerRoute(testRoute, testServer);
        should(addSenecaTaskStub.calledOnce).be.equal(true);
        should(addSenecaTaskStub.args[0][0]).be.equal(testRoute);
        should(addEndpointStub.calledOnce).be.equal(true);
        should(addEndpointStub.args[0][0]).be.equal(testRoute);
        should(addEndpointStub.args[0][1]).be.equal(testServer);

        done();

    });

});

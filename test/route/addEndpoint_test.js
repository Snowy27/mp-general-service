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
const BPromise = require('bluebird');

describe('addEndpoint tests', function() {
    let service,
        sandbox = sinon.sandbox.create(),
        createPathStub,
        createParsedMessageStub,
        actAsyncStub,
        routeStub,
        testRoute,
        testServer;

    beforeEach((done) => {
        service = new Service('test', [], {});
        service.seneca = {
            actAsync: function() {}
        };
        createPathStub = sandbox.stub(service, 'createPath');
        createParsedMessageStub = sandbox.stub(service, 'createParsedMessage');
        actAsyncStub = sandbox.stub(service.seneca, 'actAsync');
        testRoute = {
            method: 'GET',
            version: 'v1',
            cmd: 'help',
            service: 'test',
            params: ['id'],
            handler: function () {}
        };
        testServer = {
            port: 3000,
            route: function() {}
        };
        routeStub = sandbox.stub(testServer, 'route');
        done();
    });

    afterEach((done) => {
        sandbox.restore();
        done();
    });

    it('Should add an endpoint', (done) => {
        createPathStub.returns('path');
        createParsedMessageStub.returns({
            key: 'value'
        });
        actAsyncStub.returns(BPromise.resolve());
        service.addEndpoint(testRoute, testServer);

        should(createPathStub.calledOnce).be.equal(true);
        should(createPathStub.args[0][0]).be.equal(testRoute);

        should(routeStub.calledOnce).be.equal(true);
        should(routeStub.args[0][0]).be.instanceOf(Object).with.properties([
            'method',
            'path',
            'handler'
        ]);
        should(routeStub.args[0][0].method).be.equal('GET');
        should(routeStub.args[0][0].path).be.equal('path');
        should(routeStub.args[0][0].handler).be.instanceOf(Function);

        routeStub.args[0][0].handler({}, function() {});
        should(createParsedMessageStub.calledOnce).be.equal(true);
        should(createParsedMessageStub.args[0][0]).be.equal(testRoute);
        should.deepEqual(createParsedMessageStub.args[0][1], {});
        done();

    });

});

'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const Joi = require('joi');
const sinon = require('sinon');
const should = require('should');
const Service = require('./../../lib');

describe('validateMessage tests', function() {
    let service,
        sandbox = sinon.sandbox.create(),
        joiValidateStub,
        message,
        schema,
        config;

    beforeEach((done) => {
        service = new Service('test', [], {});
        joiValidateStub = sandbox.stub(Joi, 'validate');
        message = {
            cmd: 'help'
        };
        schema = {
            cmd: Joi.string()
        };
        config = {
            some: 'value'
        };
        done();
    });

    afterEach(function (done) {
        sandbox.restore();
        done();
    });

    it('Should resolve if validation passed', (done) => {

        joiValidateStub.returns({
            error: null
        });
        service.validateMessage(message, schema, config)
            .then(function() {
                should(joiValidateStub.calledOnce).be.equal(true);
                should(joiValidateStub.args[0][0]).be.equal(message);
                should(joiValidateStub.args[0][1]).be.equal(schema);
                should(joiValidateStub.args[0][2]).be.equal(config);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('Should reject if validation errored', (done) => {

        joiValidateStub.returns({
            error: 'Something errored'
        });
        service.validateMessage(message, schema)
            .then(function() {
                done(new Error('This should not pass!'));
            })
            .catch((err) => {
                should(err.isBoom).be.equal(true);
                should(joiValidateStub.calledOnce).be.equal(true);
                should(joiValidateStub.args[0][0]).be.equal(message);
                should(joiValidateStub.args[0][1]).be.equal(schema);
                should.deepEqual(joiValidateStub.args[0][2], {});
                done();
            });
    });

});

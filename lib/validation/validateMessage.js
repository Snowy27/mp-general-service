'use strict';

const Joi = require('joi');
const BPromise = require('bluebird');
const Hoek = require('hoek-boom');

module.exports = function validateMessage (message, schema, config) {
    config = config || {};
    let err = Joi.validate(message, schema, config);

    if (err.error) {
        let boomError = Hoek.Boom.badRequest(err.error);
        return BPromise.reject(boomError);
    }

    return BPromise.resolve();
};

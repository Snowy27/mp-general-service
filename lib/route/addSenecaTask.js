'use strict';

module.exports = function addSenecaTask(route) {
    let self = this,
        pattern,
        promise;

    pattern = self.createPattern(route);

    self.seneca.add(pattern, (message, next) => {

        //Validate the message first if route has validation rules
        if (route.validation) {

            promise = self.validateMessage(message, route.validation, self.config.VALIDATION_CONFIG)
                .then(function() {
                    return route.handler.call(self, message);
                });

        } else {
            promise = route.handler.call(self, message);
        }

        promise = promise
            .then((resp) => {
                next(null, {
                    result: 'success',
                    response: resp
                });
            })
            .catch((err) => {
                next(err);
            });

        return promise;
    });
};

'use strict';

module.exports = function addSenecaTask(route) {
    let self = this,
        pattern,
        promise;

    pattern = self.createPattern(route);

    self.seneca.add(pattern, (message, next) => {

        if (route.validation) {

            //Validate the message first

            promise = self.validateMessage(message, route.validation, self.config.VALIDATION_CONFIG)
                .then(function() {
                    return route.handler.call(self, message);
                });
                
        } else {
            promise = route.handler.call(self, message);
        }

        promise = promise.then(function(resp) {
                next(null, {
                    result: 'success',
                    response: resp
                });
            })
            .catch(function(err) {
                next(err);
            });

        return promise;
    });
};

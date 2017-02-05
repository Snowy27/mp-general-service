'use strict';

module.exports = function addSenecaTask(route) {
    let self = this,
        pattern;

    pattern = self.createPattern(route);

    self.seneca.add(pattern, (message, next) => {
        route.handler.call(self, message)
            .then(function(resp) {
                next(null, {
                    result: 'success',
                    response: resp
                });
            })
            .catch(function(err) {
                next({
                    result: 'error',
                    error: err
                });
            });
    });
};

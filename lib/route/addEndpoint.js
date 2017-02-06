'use strict';

module.exports = function addEndpoint(route, server) {
    let self = this,
        path,
        parsedMessage;

    path = self.createPath(route);

    server.route({
        method: route.method,
        path: path,
        handler: (request, reply) => {
            //Add all request data to the message (params, query, payload)
            parsedMessage = self.createParsedMessage(route, request);
            return self.seneca.actAsync(parsedMessage)
                .done(reply, reply);
        }
    });
};

This is the basic service that starts up Hapi server and Seneca client with provided routes.

*Example of usage:*

```javascript
let tutorialService = new Service('tutorial', [{method: 'GET', version: 'v1', cmd: 'help', params: ['lesson_id'], handler: helpHandle}], {
    PORT:3000,
    SENECA_LISTEN_PORT: 3001
});
```

This will create a Hapi server that will listen on port 3000, with the route GET /tutorial/v1/{lesson_id}/help,
as well as a Seneca client, that will take port 3001.
You can connect to this Seneca client from other services passing SENECA_CLIENT_PORTS: [3001] in the config.
After that you will be able to call this task with
```javascript
this.seneca.actAsync({service: 'tutorial', version: 'v1', method: 'GET', cmd: 'help'})
```
Both Hapi server and Seneca client retun response in the next form:

```javascript
{
    result: "success|error",
    response: {...}
}
```

Additionaly, you can pass Joi validation schema to the route {method: 'GET', validation: {SCHEMA}, ...}

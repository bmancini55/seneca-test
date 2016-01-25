let seneca = require('seneca')();
let mongo = require('mongo-helper');
let registry = require('./registry');

mongo
  .connect({ url: 'mongodb://dev.southsidecomicspgh.com/seneca-test' })
  .then(() => console.log('Connected to mongodb'))
  .catch(console.log);

seneca
  .use(registry.plugin)
  .listen({
    type: 'http',
    pin: 'role:registry'
  });
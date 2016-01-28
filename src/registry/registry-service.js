let seneca = require('seneca')();
let mongo = require('mongo-helper');
let registry = require('./registry');

mongo
  .connect({ url: 'mongodb://dev.southsidecomicspgh.com/seneca-test' })
  .then(() => console.log('Connected to mongodb'))
  .catch(console.log);

seneca
  .use(registry.plugin)
  .use('mesh', {
    auto: true,
    basehost: '172.17.0.2',
    host: '172.17.0.3',
    pin: 'role:registry'
  });
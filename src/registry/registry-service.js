let seneca = require('seneca')();

seneca
  .use('mongo-store',{
    name:'seneca-test',
    host:'dev.southsidecomicspgh.com',
    port:27017
  })
  .use(require('./registry').create())
  .listen({
    type: 'http',
    pin: 'role:registry'
  });
let seneca = require('seneca')();

seneca
  .use('mongo-store', {
    name:'southsidecomics',
    host:'dev.southsidecomicspgh.com',
    port:27017
  })
  .use(require('./comics-metadata').create())
  .client({
    type: 'http',
    pin: 'role:registry'
  })
  .ready(() => {
    register({
      seneca: seneca,
      type: 'comics-metadata',
      host: 'HOST',
      port: 10102
    });
  })
  .listen({
    pin: 'comics-metadata',
    port: 10102
  });

function register({ seneca, type, host, port }) {
  let op = () => seneca.act({ role: 'registry', cmd: 'register', type, host, port });
  op();
  setInterval(op, 15000);
};
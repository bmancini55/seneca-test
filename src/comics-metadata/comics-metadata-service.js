let seneca = require('seneca')();
let mongo = require('mongo-helper');
let comicmetadata = require('./comics-metadata')

mongo
  .connect({ url: 'mongodb://dev.southsidecomicspgh.com/southsidecomics' })
  .then(() => console.log('Connected to mongodb'))
  .catch(console.log);

seneca
  .use(comicmetadata.plugin)
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
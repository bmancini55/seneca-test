let seneca = require('seneca')();
let mongo = require('mongo-helper');
let comicmetadata = require('./comics-metadata')

mongo
  .connect({ url: 'mongodb://dev.southsidecomicspgh.com/southsidecomics' })
  .then(() => console.log('Connected to mongodb'))
  .catch(console.log);

seneca
  .use(comicmetadata.plugin)
  .use('mesh', {
    auto: true,
    basehost: '172.17.0.2',
    host: '172.17.0.4',
    pin: 'role:comics-metadata'
  })
  .ready(() => {
    register({
      seneca: seneca,
      type: 'comics-metadata',
      host: '172.17.0.4', // need to retrieve this
      port: 10102         // need to retrieve this
    });
  });

function register({ seneca, type, host, port }) {
  let op = () => seneca.act({ role: 'registry', cmd: 'register', type, host, port });
  op();
  setInterval(op, 15000);
};
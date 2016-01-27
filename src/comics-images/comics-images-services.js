let seneca = require('seneca')();
let comicsimages = require('./comics-images');

seneca
  .use(comicsimages.plugin)
  .use('mesh', {
    auto: true,
    pin: 'role:comics-images'
  })
  .ready(() => {
    register({
      seneca: seneca,
      type: 'comics-images',
      host: 'HOST', // need to retrieve this
      port: 10102   // need to retrieve this
    });
  });

function register({ seneca, type, host, port }) {
  let op = () => seneca.act({ role: 'registry', cmd: 'register', type, host, port });
  op();
  setInterval(op, 15000);
};
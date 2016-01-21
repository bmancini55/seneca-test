let seneca = require('seneca')();

function plugin(options) {
  console.log(options);
}

seneca.use(plugin, { foo: 'bar' });
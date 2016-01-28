let seneca = require('seneca')();

seneca
  .use('mesh', { base: true, host: '172.17.0.2' });
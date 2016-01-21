let seneca = require('seneca')();

seneca
  .client()
  .act('role:math,cmd:product,left:"2",right:"5"', console.log);
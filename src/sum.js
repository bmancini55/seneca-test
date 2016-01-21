let seneca = require('seneca')();

seneca.add({ role: 'math', cmd: 'sum' }, (msg, respond) => {
  let sum = msg.left + msg.right;
  respond(null, { answer: sum });
});

seneca.act({ role: 'math', cmd: 'sum', left: 1, right: 2 }, (err, result) => {
  console.log(err || result);
});
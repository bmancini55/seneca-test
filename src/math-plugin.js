let fs = require('fs');

function math(options) {
  let log;

  this.add({ role: 'math', cmd: 'sum' }, sum);
  this.add({ role: 'math', cmd: 'product' }, product);

  // init pattern for the plugin
  this.add({ init: 'math' }, init);

  function init(msg, respond) {
    fs.open(options.logfile, 'a', (err, fd) => {
      if(err) return respond(err);
      log = makeLog(fd);
      respond();
    });
  }

  function makeLog(fd) {
    return (entry) => {
      let date = new Date().toISOString();
      fs.write(fd, `${date} ${entry}`, null, 'utf8', (err) => {
        if(err) return console.log(err);
        fs.fsync(fd, (err2) => {
          if(err2) return console.log(err2);
        });
      });
    };
  }

  function sum({ left, right }, respond) {
    let result = { answer: left + right };
    log(`sum ${left} + ${right} = ${result.answer}\n`);
    respond(null, result);
  }

  function product({ left, right }, respond) {
    let result = { answer: left * right };
    log(`product ${left} * ${right} = ${result.answer}\n`);
    respond(null, result);
  }
}

require('seneca')()
  .use(math, { logfile: './math.log' })
  .act({ role: 'math', cmd: 'product', left: 2, right: 5 }, console.log);
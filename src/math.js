
module.exports = function math(options) {

  this.add('role:math,cmd:sum', function({left, right}, respond) {
    respond(null, { answer: left + right });
  });

  this.add('role:math,cmd:product', function({left, right}, respond) {
    respond(null, { answer: left * right });
  });

  this.wrap('role:math', function({left,right, ...props}, respond) {
    left = Number(left).valueOf();
    right = Number(right).valueOf();
    this.prior({ left, right, ...props }, respond);
  });
};
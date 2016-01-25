require('babel/register')({
  ignore: function(filename) {
    return  filename.indexOf('mongo-helper/node_modules') > 0 ||
            (
              filename.indexOf('node_modules') > 0 &&
              filename.indexOf('node_modules/mongo-helper') < 0
            );
  }
});
require('./registry-service');
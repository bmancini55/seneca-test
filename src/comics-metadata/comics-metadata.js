/**
 * Reads information from a comic book product data from MongoDB.
 * This service will be registered registry microservice.
 */

let mongo = require('mongo-helper');

// export the factory function
// and each function that we want to test
module.exports = {
  plugin,
  list
};

// Factory function that converts promisifed functions into
// mounted callback functions via the standard add method.
// Idally seneca.add could be extended to perform this functionality
// automatically.
function plugin() {
  let seneca = this;
  seneca.add('role:comics-metadata,cmd:list', (args, cb) => list(args).then((res) => cb(null, res)).catch(cb));
}

async function list({ skip = 0, limit = 20 }) {
  let collection = mongo.collection('items');
  return await collection
    .find({})
    .skip(skip)
    .limit(limit)
    .toArrayAsync();
}

/**
 * Provides a service registry that all services call so that
 * we can have a view of he microservice architectures. Each
 * service will call register on so that we can have a
 * realtime view of what the infrastrucure looks like.
 *
 * There might be a better mechanism for handling this that
 * is built into seneca... possible some ability to view
 * the entire peer list?
 */

let mongo = require('mongo-helper');

// export the factory function
// and each function that we want to test
module.exports = {
  plugin,
  register,
  unregister,
  list
};

// Factory function that converts promisifed functions into
// mounted callback functions via the standard add method.
// Idally seneca.add could be extended to perform this functionality
// automatically.
function plugin() {
  let seneca = this;
  seneca.add('role:registry,cmd:register', (args, cb) => register(args).then((res) => cb(null, res)).catch(cb));
  seneca.add('role:registry,cmd:unregister', (args, cb) => unregister(args).then((res) => cb(null, res)).catch(cb));
  seneca.add('role:registry,cmd:list', (args, cb) => list(args).then((res) => cb(null, res)).catch(cb))
}

async function register({ type, host, port }) {
  let collection = mongo.collection('microservice');
  let filter = {
    type: type,
    host: host,
    port: port
  };
  let update = {
    $set: {
      type: type,
      host: host,
      port: port,
      updated: new Date().toISOString()
    },
    $setOnInsert: {
      created: new Date().toISOString()
    }
  };
  let options = {
    upsert: true,
    returnOriginal: false
  };
  let result = await collection.findOneAndUpdate(filter, update, options);
  return result.value;
}

async function unregister({ type, host, port }) {
  let collection = mongo.collection('microservice');
  await collection.remove({ type, host, post });
}

async function list() {
  let collection = mongo.collection('microservice');
  return await collection
    .find({})
    .toArrayAsync();
}
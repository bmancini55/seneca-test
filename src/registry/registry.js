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

// export the factory function
// and each function that we want to test
module.exports = {
  create() {
    return function(options) {
      let seneca = this;
      seneca.add('role:registry,cmd:register', (args, cb) => register(args, cb).catch(cb));
      seneca.add('role:registry,cmd:unregister', (args, cb) => unregister(args, cb).catch(cb));
      seneca.add('role:registry,cmd:list', (args, cb) => list(args, cb).catch(cb))
    }
  },
  register,
  unregister,
  list
};

async function register({ type, host, port }, cb) {
  // TODO promisify save$
  let entity = cb.seneca.make$('microservice')
  entity.type = type;
  entity.host = host;
  entity.port = port;
  entity.updated = new Date().toISOString();
  entity.save$(cb);
}

async function unregister({ type, host, port }, cb) {
  // TODO promisify remove$
  let entity = cb.seneca.make$('microservice');
  entity.remove$({ type, host, port }, cb);
}

async function list({ }, cb) {
  // TODO promisify list$
  let entity = cb.seneca.make$('microservice');
  entity.list$({ }, cb);
}
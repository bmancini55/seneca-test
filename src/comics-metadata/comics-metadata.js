/**
 * Reads information from a comic book product data
 * from MongoDB.
 */

// export the factory function
// and each function that we want to test
module.exports = {
  create() {
    return function(options) {
      let seneca = this;
      seneca.add('role:comics-metadata,cmd:list', (args, cb) => list(args, cb).catch(cb));
    }
  },
  list
};

async function list({ skip = 0, limit = 20 }, cb) {
  let entity = cb.seneca.make$('items');
  await entity.list$({ skip$: skip, limit$: limit }, cb);
}

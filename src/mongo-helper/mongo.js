let mongodb = require('mongodb');
let Bluebird = require('bluebird');
Bluebird.promisifyAll(mongodb);

let instance;

async function connect({ url }) {
  instance = await mongodb.connectAsync(url);
  return instance;
}

function db() {
  return instance;
}

function collection(name) {
  return instance.collection(name);
}

module.exports = {
  connect,
  db,
  collection
};
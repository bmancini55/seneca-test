/**
 * This service acts as a file repository that is backed by S3.
 * It will fetch files based on the supplied identifier and return
 * either metdata or file bytes.
 */

let path = require('path');
let bluebird = require('bluebird');
let request = require('request');
request.getAsync = bluebird.promisify(request.get, request);


// export the factory function
// and each function that we want to test
module.exports = {
  plugin,
  getBytes,
  getMetadata
};


// Factory function that converts promisifed functions into
// mounted callback functions via the standard add method.
// Idally seneca.add could be extended to perform this functionality
// automatically.
function plugin() {
  let seneca = this;
  seneca.add('role:comics-images,cmd:metadata', (msg, res) => getMetadata(msg).then((val) => res(null, val).catch(res)));
  seneca.add('role:comics-images,cmd:bytes', (msg, res) => getBytes(msg).then((val) => res(null, val).catch(res)));
}


async function getMetadata({ stock_no, size = 400 }) {
  let result = await getFile({ stock_no, size });
  if(result.statusCode === 200)
    return {
      filename: result.filename,
      href: result.href,
      size: result.headers['content-length'],
      contentType: result.headers['content-type']
    };
  else
    return 'The image failed to load';
}

async function getBytes({ stock_no, size = 400 }) {
  let result = await getFile({ stock_no, size });
  if(result.statusCode === 200)
    return result.body;
  else
    return 'The image failed to load';
}

async function getFile({ stock_no, size = 400 }) {
  let folder = getFolder(stock_no);
  let filename = `${stock_no}_${size}.jpg`;
  let url = `https://s3.amazonaws.com/southsidecomics/items/${folder}/${filename}`;
  let result = await request.getAsync(url);
  result.href = url;
  result.filename = filename;
  return result;
}

function getFolder(stock_no) {
  let CHUNK_LENGTH = 3;
  let remaining = stock_no;
  let chunks = [];

  while(remaining.length >= CHUNK_LENGTH) {
    chunks.push(remaining.substr(0, CHUNK_LENGTH));
    remaining = remaining.substr(CHUNK_LENGTH);
  }

  return path.join.apply(path.join, chunks);
}

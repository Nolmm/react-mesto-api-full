const fsPromisses = require('fs').promises;

module.exports = (path) => fsPromisses.readFile(path, { encoding: 'utf8' })
  .then((data) => JSON.parse(data));

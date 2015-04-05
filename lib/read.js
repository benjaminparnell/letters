var fs = require('fs')
var path = require('path')

module.exports = function (file) {
  return fs.createReadStream(path.join(__dirname, '..', 'static', file))
}

var crypto = require('crypto')

module.exports = function (serviceLocator) {
  return function getUnusedCode (callback) {
    var code = makeCode()

    serviceLocator.db.get(code, function (error, value) {
      if (error.type === 'NotFoundError') return callback(null, code)
      if (error) return callback(error)
      if (value) return getUnusedCode(callback)
    })
  }
}

function makeCode () {
  var shasum = crypto.createHash('sha256')
  shasum.update('' + Date.now() + Math.random())
  return shasum.digest('hex').substring(0, 7)
}

// Export for testing
module.exports.makeCode = makeCode

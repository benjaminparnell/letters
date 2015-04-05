var md = require('markdown-it')()
var trumpet = require('trumpet')
var layout = require('../lib/layout')
var read = require('../lib/read')

module.exports = function (serviceLocator) {
  return function (req, res, next, params) {
    var code = params.shortCode

    serviceLocator.logger.debug('Getting code ' + code)

    serviceLocator.db.get(code, function (error, value) {
      if (error && error.type === 'NotFoundError') {
        serviceLocator.logger.debug(error)
        res.statusCode = 404
        return res.end('Not found :(')
      }

      if (error) {
        serviceLocator.logger.error(error)
        res.statusCode = 500
        return res.end()
      }

      var markdown = md.render(value)
      var tr = trumpet()

      read('letter.html').pipe(tr).pipe(layout(res))
      tr.createWriteStream('.letter').end(markdown)
    })
  }
}

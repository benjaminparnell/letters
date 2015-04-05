var createGetUnusedCode = require('../lib/get-unused-code')

module.exports = function (serviceLocator) {
  var getUnusedCode = createGetUnusedCode(serviceLocator)

  return function (req, res) {
    if (req.method === 'GET') {
      // read('form.html').pipe(layout(res))
      res.end('Web uploading coming soon...maybe...')
    } else if (req.method === 'POST') {
      if (req.headers['content-type'] === 'x-markdown') {
        getUnusedCode(function (error, code) {
          if (error) {
            serviceLocator.logger.error(error)
            res.statusCode = 500
            res.end()
          }

          var letter = ''

          req.on('data', function (data) {
            letter += data.toString()
          })

          req.on('end', function () {
            serviceLocator.logger.info('Inserting letter with code ' + code)
            serviceLocator.db.put(code, letter, function (error) {
              if (error) {
                serviceLocator.logger.error(error)
                res.statusCode = 500
                res.end()
              }
              res.writeHead(302, { 'Location': '/' + code })
              res.end(code)
            })
          })
        })
      } else {
        res.statusCode = 406
        res.end()
      }
    }
  }
}

var http = require('http')
var router = require('routes')()
var ecstatic = require('ecstatic')

var staticd = ecstatic({
  root: __dirname + '/static',
  showDir: true,
  autoIndex: true,
  gzip: true
})

module.exports = function (serviceLocator) {
  router.addRoute('/:shortCode([a-zA-Z0-9]+)', require('./routes/letter')(serviceLocator))
  router.addRoute('/', require('./routes/index')(serviceLocator))

  var server = http.createServer(function (req, res) {
    var m = router.match(req.url)
    if (m) m.fn(req, res, m.next, m.params)
    else staticd(req, res)
  })

  return server
}

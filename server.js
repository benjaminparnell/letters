var http = require('http')
var bunyan = require('bunyan')
var router = require('routes')()
var ecstatic = require('ecstatic')
var levelup = require('level')
var serviceLocator = require('service-locator')()

var logLevel = process.env.LOG_LEVEL || 'debug'
var dbPath = './db'
var db = levelup(dbPath)
var logger = bunyan.createLogger({
  name: 'letters',
  stream: process.stdout,
  level: logLevel
})

serviceLocator.register('db', db)
serviceLocator.register('logger', logger)

var staticd = ecstatic({
  root: __dirname + '/static',
  showDir: true,
  autoIndex: true,
  gzip: true
})

router.addRoute('/:shortCode([a-zA-Z0-9]+)', require('./lib/showLetter')(serviceLocator))
router.addRoute('/', require('./lib/index')(serviceLocator))

var server = http.createServer(function (req, res) {
  var m = router.match(req.url)
  if (m) m.fn(req, res, m.params, m.next)
  else staticd(req, res)
})

var port = process.env.PORT || 1337

server.listen(port, function () {
  serviceLocator.logger.info('Letters started on port ' + port)
})

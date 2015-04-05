var bunyan = require('bunyan')
var levelup = require('level')
var serviceLocator = require('service-locator')()

var port = process.env.PORT || 1337
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

var server = require('./server')(serviceLocator)

server.listen(port, function () {
  serviceLocator.logger.info('Letters started on port ' + port)
})

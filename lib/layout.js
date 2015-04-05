var trumpet = require('trumpet')
var read = require('./read')

module.exports = function (res) {
  res.setHeader('content-type', 'text/html')
  var tr = trumpet()
  read('layout.html').pipe(tr).pipe(res)
  return tr.createWriteStream('#content')
}

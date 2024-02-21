const bodyParser = require('body-parser')
const doc = require('./docRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    doc
  )
}

const bodyParser = require('body-parser')
const doc = require('./docRoute')
const user = require('./userRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    doc,
    user
  )
}

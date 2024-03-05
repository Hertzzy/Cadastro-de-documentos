const bodyParser = require('body-parser')
const doc = require('./docRoute')
const user = require('./userRoute')
const role = require('./roleRoute')
const permission = require('./permissionRoute')
const auth = require('./authRoute')
const security = require('./securityRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    doc,
    user,
    role,
    permission,
    security
  )
}

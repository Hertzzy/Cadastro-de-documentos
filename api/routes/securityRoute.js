const { Router } = require('express');
const SecurityController = require('../controller/securityController')

const router = Router()

router
    .post('/security/acl', SecurityController.registerAcl)
    .post('/security/permissions-roles')
   
module.exports = router
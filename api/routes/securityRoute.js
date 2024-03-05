const { Router } = require('express');
const SecurityController = require('../controller/securityController')

const roles = require('../middleware/roles');
const permissions = require('../middleware/permissions');
const permissionsRoles = require('../middleware/permissions-role.js')

const authenticated = require('../middleware/authenticated')

const router = Router()

router.use(authenticated)

router
    .post('/security/acl', roles(["Administrador"]), SecurityController.registerAcl)
    .post('/security/permissions-roles', roles(["Administrador"]), SecurityController.registerPermissionsRoles)
   
module.exports = router
const { Router } = require('express');
const RoleController = require('../controller/roleController')

const roles = require('../middleware/roles');
const permissions = require('../middleware/permissions');
const permissionsRoles = require('../middleware/permissions-role.js')

const authenticated = require('../middleware/authenticated')


const router = Router()

router.use(authenticated)

router
    .post('/roles', roles(["Administrador", "Gerente"]), RoleController.registerRole)
    .get('/roles', permissions(["Listar"]), RoleController.searchAllRoles)
    .get('/roles/id/:id', permissions(["Listar"]), RoleController.searchRoleId)
    .delete('/roles/id/:id', roles(["Administrador"]), permissions(["Excluir"]), RoleController.deleteRoleId)
    .put('/roles/id/:id', permissionsRoles(["Editar"]), RoleController.editRole)

module.exports = router
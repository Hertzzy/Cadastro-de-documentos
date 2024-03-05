const { Router } = require('express');
const PermissionController = require('../controller/permissionController')

const roles = require('../middleware/roles');
const permissions = require('../middleware/permissions');
const permissionsRoles = require('../middleware/permissions-role.js')

const authenticated = require('../middleware/authenticated')

const router = Router()

router.use(authenticated)

router
    .post('/permissions', roles(["Administrador", "Gerente"]), PermissionController.registerPermission)
    .get('/permissions', permissions(["Listar"]), PermissionController.searchAllPermission)
    .get('/permissions/id/:id', permissions(["Listar"]), PermissionController.searchPermissionId)
    .delete('/permissions/id/:id', roles(["Administrador"]), permissions(["Excluir"]), PermissionController.deletePermissionId)
    .put('/permissions/id/:id', permissionsRoles(["Editar"]), PermissionController.editPermission)

module.exports = router
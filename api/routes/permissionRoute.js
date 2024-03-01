const { Router } = require('express');
const PermissionController = require('../controller/permissionController')

const router = Router()

router
    .post('/permissions', PermissionController.registerPermission)
    .get('/permissions', PermissionController.searchAllPermission)
    .get('/permissions/id/:id', PermissionController.searchPermissionId)
    .delete('/permissions/id/:id', PermissionController.deletePermissionId)
    .put('/permissions/id/:id', PermissionController.editPermission)

module.exports = router
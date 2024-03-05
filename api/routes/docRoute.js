const { Router } = require('express');
const DocController = require('../controller/docControllers');

const uploadDocs = require('../middleware/uploadDocs.js');

const roles = require('../middleware/roles');
const permissions = require('../middleware/permissions');
const permissionsRoles = require('../middleware/permissions-role.js')


const authenticated = require('../middleware/authenticated')

const router = Router()

router.use(authenticated)

router
    .post('/doc', permissionsRoles(["Registrar"]), uploadDocs.single('upload'), DocController.registerDoc)
    .get('/doc', permissions(["Listar"]), DocController.searchAllDocs)
    .get('/doc/id/:id', permissions(["Listar"]), DocController.searchDocsId)
    .delete('/doc/id/:id', roles(["Administrador"]), permissions(["Excluir"]), DocController.deleteDocId)
    .put('/doc/id/:id', permissionsRoles(["Editar"]), uploadDocs.single('upload'), DocController.editDoc)

module.exports = router
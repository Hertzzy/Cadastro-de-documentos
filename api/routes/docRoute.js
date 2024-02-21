const { Router } = require('express');
const DocController = require('../controller/docControllers');
const uploadDocs = require('../middleware/uploadDocs.js')


const router = Router()

router
    .post('/doc', uploadDocs.single('upload'), DocController.registerDoc)
    .get('/doc', DocController.SearchAllDocs)
    .get('/doc/id/:id', DocController.SearchDocsId)
    .delete('/doc/id/:id', DocController.deleteDocId)
    .put('/doc/id/:id', DocController.editDoc)

module.exports = router
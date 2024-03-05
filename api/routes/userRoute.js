const { Router } = require('express');
const UserController = require('../controller/userController');
const autenticado = require('../middleware/authenticated')

const router = Router()

router
    .post('/users', UserController.registerUser)
    .get('/users', autenticado, UserController.searchAllUsers)
    .get('/users/id/:id', autenticado, UserController.searchUserId)
    .delete('/users/id/:id', autenticado, UserController.deleteUserId)
    .put('/users/id/:id', autenticado, UserController.editUser)

module.exports = router
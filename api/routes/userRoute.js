const { Router } = require('express');
const UserController = require('../controller/userController')

const router = Router()

router
    .post('/users', UserController.registerUser)
    .get('/users', UserController.searchAllUsers)
    .get('/users/id/:id', UserController.searchUserId)
    .delete('/users/id/:id', UserController.deleteUserId)
    .put('/users/id/:id', UserController.editUser)

module.exports = router
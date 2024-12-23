const express = require('express');
const router = express.Router();
const userController = require('./user_controller');

// CRUD routes for users
router.post('/users', userController.addUser);
router.get('/users', userController.readAllUsers);
router.get('/users/:id', userController.readSingleUser);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const { validateUserCreation, handleValidationErrors } = require('../../validator/userValidator')


router.post('/', validateUserCreation, handleValidationErrors,  usersController.createUser);
router.get('/', usersController.getUserById);
router.put('/', usersController.updateUser);

module.exports = router;
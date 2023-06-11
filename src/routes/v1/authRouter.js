const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { validateUserCreation, handleValidationErrors } = require('../../validator/userValidator')


router.post('/public/register', validateUserCreation, handleValidationErrors, authController.register);
router.post('/public/login', authController.login);

module.exports = router;
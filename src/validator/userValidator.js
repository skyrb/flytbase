const { body, validationResult } = require('express-validator');
const errorMessages = require('../utils/errorMessages');
const messages = require('../utils/messages');

const validateUserCreation = [
  body('username').notEmpty().withMessage(errorMessages.nameRequire),
  body('email').isEmail().withMessage(errorMessages.invalidemail),
  body('password').isLength({ min: 6 }).withMessage(errorMessages.invalidPassword),
];


const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUserCreation,
  handleValidationErrors,
};
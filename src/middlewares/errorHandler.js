const errorMessages = require("../utils/errorMessages");
const messages = require("../utils/messages");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = errorMessages.internalServerError;
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }
  console.error(err);
  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;

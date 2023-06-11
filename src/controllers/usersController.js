const userRepository = require('../repository/userRepository');
const errorMessages = require('../utils/errorMessages');
const messages = require('../utils/messages');


// Create a new user
const createUser = async (req, res, next) => {
  try {
    const user = await userRepository.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};


// Get a single user
const getUserById = async (req, res, next) => {
  try {
    const filter = {
      _id : req.user._id
    }
    const user = await userRepository.getUsers(filter);
    if (user) {
      res.json(user[0]);
    } else {
      res.status(404).json({ error: errorMessages.userNotFound });
    }
  } catch (error) {
    next(error);
  }
};

// Update a user
const updateUser = async (req, res, next) => {
  try {
    await userRepository.updateUser(req.user._id, req.body);
    res.json({message : messages.userUpdated});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserById
}
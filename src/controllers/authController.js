const userRepository = require('../repository/userRepository');
const errorMessages = require('../utils/errorMessages');
const jwt = require('jsonwebtoken');



// Register a new user
const register = async (req, res, next) => {
  try {
    // Check if the user already exists
    const filter = {
      email : req.body.email
    }
    let user = await userRepository.getUsers(filter);
    if (!user) {
      return res.status(400).json({ error: errorMessages.userExist });
    }

    // Create the user
    const newUser = await userRepository.createUser(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    // Check if the user exists
    const filter = {
      email : req.body.email
    }
    let user = await userRepository.getUsers(filter);
    if (!user.length) {
      return res.status(401).json({ error: errorMessages.invalidEmailOrPassword });
    }

    user = user[0]

    // Compare passwords
    const isPasswordValid = await user.comparePassword(req.body.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: errorMessages.invalidEmailOrPassword });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register
}
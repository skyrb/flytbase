const User = require('../models/users');

const createUser = async (userData) => {
  return User.create(userData);
};

const updateUser = async (userId, userData) => {
  return User.findByIdAndUpdate(userId, userData, { new: true });
};

const getUsers = async (filter) => {
  return User.find(filter);
};

module.exports = {
  createUser,
  getUsers,
  updateUser
}
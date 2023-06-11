const Drone = require('../models/drones');

const createDrone = async (data) => {
  return Drone.create(data)
}

const updateDrone = async (droneId, data) => {
  return await Drone.findByIdAndUpdate(droneId, data, { new: true });
}

const getDrones = async (filter) => {
  return await Drone.find(filter);
}

const deleteDrones = async (filter) => {
  return await Drone.deleteMany(filter);
}
module.exports = {
  createDrone,
  updateDrone,
  getDrones,
  deleteDrones
}
const Mission = require('../models/missions');

const createMission = async (missionData) => {
  return await Mission.create(missionData);
}

const updateMission = async (missionId, missionData) => {
  return await Mission.findByIdAndUpdate(missionId, missionData, { new: true });
}

const deleteMissions = async (filter) => {
  return await Mission.deleteMany(filter);
}

const getMissions = async (filter) => {
  return await Mission.find(filter)
}

module.exports = {
  createMission,
  deleteMissions,
  updateMission,
  getMissions
}
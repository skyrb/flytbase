const mongoose = require('mongoose');
const MissionRepository = require('../repository/missionRepository')
const DroneRepository = require('../repository/droneRepository')
const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  alt: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }

});

siteSchema.pre('deleteOne', async function (next) {
  try {
    await MissionRepository.deleteMissions({ site: this._conditions._id });
    await DroneRepository.deleteDrones({ site: this._conditions._id });
    next();
  } catch (error) {
    next(error);
  }
});


siteSchema.index({ user: 1 });

module.exports = mongoose.model('Site', siteSchema);
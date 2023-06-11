const mongoose = require('mongoose');
const MissionRepository = require('../repository/missionRepository')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  tag_name: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

categorySchema.pre('deleteOne', async function (next) {
  try {
    await MissionRepository.deleteMissions({ category: this._conditions._id });
    next();
  } catch (error) {
    next(error);
  }
});


categorySchema.index({user : 1 });

module.exports = mongoose.model('Category', categorySchema);

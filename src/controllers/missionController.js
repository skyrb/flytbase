const MissionRepository = require('../repository/MissionRepository');
const siteRepository = require('../repository/SiteRepository');
const categoryRepository = require('../repository/CategoryRepository');
const errorMessages = require('../utils/errorMessages');
const messages = require('../utils/messages');



const validateCreateOrUpdate = async (body) => {
  try {
    const site_id = body.site
    const category_id = body.category
    if (site_id) {
      const siteFilter = {
        _id : site_id
      }
      const siteData = await siteRepository.getSites(siteFilter);
      if (!siteData.length) {
        throw new Error(errorMessages.siteNotFound);
      }
    }

    if (category_id) {
      const categoryFilter = {
        _id : category_id
      }
      const categoryData = await categoryRepository.getCategories(categoryFilter);
      if (!categoryData.length) {
        throw new Error(errorMessages.categoryNotFound);
      }
    }
  } catch (err) {
    throw err
  }

}


const createMission = async (req, res, next) => {
  try {
    const body = req.body
    console.log("Mission Body", body)
    await validateCreateOrUpdate(body)

    const mission = await MissionRepository.createMission(body);
    await mission.save();

    res.status(201).json(mission);
  } catch (err) {
    console.error(err);
    const message = Object.values(errorMessages).includes(err.message) ? err.message : errorMessages.internalServerError
    res.status(500).json({ message });
  }
}

const updateMission = async (req, res, next) => {
  try {
    const missionId = req.params.id;
    const body = req.body;
    console.log("Mission Id", missionId)
    console.log("Mission Body", body)
    await validateCreateOrUpdate(res, body)
    await MissionRepository.updateMission(missionId, body);
    res.json({message : messages.missionUpdated});
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToUpdate });
  }
}

const deleteMission = async (req, res, next) => {
  const missionId = req.params.id;
  try {
    console.log("Mission Id", missionId)
    const filter = {
      _id: missionId
    }
    await MissionRepository.deleteMissions(filter);
    res.json({ message: messages.missionDeleted });
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToDelete });
  }
}

const getMissionById = async (req, res, next) => {
  const missionId = req.params.id;
  try {
    console.log("Mission Id", missionId)
    const filter = {
      _id: missionId
    }
    const Mission = await MissionRepository.getMissions(filter);
    if (!Mission) {
      return res.status(404).json({ error: errorMessages.missionNotFound });
    }
    res.json(Mission[0]);
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToFetch });
  }
}

module.exports = {
  createMission,
  updateMission,
  deleteMission,
  getMissionById
}

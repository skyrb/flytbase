const siteRepository = require('../repository/siteRepository');
const userRepository = require('../repository/userRepository');
const missionRepository = require('../repository/missionRepository');
const droneRepository = require('../repository/droneRepository');
const errorMessages = require('../utils/errorMessages');
const messages = require('../utils/messages');

const createSite = async (req, res, next) => {
  try {
    const userId = req.user._id
    const userFilter = {
      _id : userId
    }
    console.log("User Id", userId)
    const user = await userRepository.getUsers(userFilter);
    if (!user.length) {
      return res.status(404).json({ message: errorMessages.userNotFound });
    }

    console.log("Site body", req.body)

    const site = await siteRepository.createSite(userId, req.body);
    await site.save();

    res.status(201).json(site);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: errorMessages.internalServerError });
  }
}

const updateSite = async (req, res, next) => {
  const siteId = req.params.id
  const body = req.body;
  try {
    console.log("Site Id", siteId)
    console.log("Site body", body)
    await siteRepository.updateSite(siteId, body);
    res.json({message : messages.siteUpdated});
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToUpdate });
  }
}

const deleteSite = async (req, res, next) => {
  const siteId = req.params.id
  try {
    console.log("Site Id", siteId)
    await siteRepository.deleteSite(siteId);
    res.json({ message: messages.siteDeleted });
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToDelete });
  }
}

const getSitesByUser = async (req, res, next) => {
  try {
    const filter = {
      user : req.user._id
    }
    const sites = await siteRepository.getSites(filter);
    res.json(sites);
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToFetch });
  }
}

const getSiteById = async (req, res, next) => {
  const siteId = req.params.id
  try {
    console.log("Site Id", siteId)
    const filter = {
      _id : siteId
    }
    const site = await siteRepository.getSites(filter);
    if (!site) {
      return res.status(404).json({ error: errorMessages.siteNotFound });
    }
    res.json(site[0]);
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToFetch });
  }
}

const getMissionBySite = async (req, res, next) => {
  try {
    const siteId = req.params.id
    const missionFilter = {
      site: siteId
    }
    const missions = await missionRepository.getMissions(missionFilter)
    res.json(missions)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: errorMessages.internalServerError });
  }
}

const getDroneBySite = async (req, res, next) => {
  try {
    const siteId = req.params.id
    const missionFilter = {
      site: siteId
    }
    const missions = await droneRepository.getDrones(missionFilter)
    res.json(missions)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: errorMessages.internalServerError });
  }
}



module.exports = {
  createSite,
  updateSite,
  deleteSite,
  getSiteById,
  getSitesByUser,
  getMissionBySite,
  getDroneBySite
}

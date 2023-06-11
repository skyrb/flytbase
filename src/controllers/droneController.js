const siteRepository = require('../repository/siteRepository');
const droneRepository = require('../repository/droneRepository');
const errorMessages = require('../utils/errorMessages');
const messages = require('../utils/messages');


const createDrone = async (req, res, next) => {
  const siteId = req.body.site
  try {
    console.log("Site Id", siteId)
    const siteFilter = {
      _id : siteId
    }
    const site = await siteRepository.getSites(siteFilter);
    if (!site.length) {
      return res.status(404).json({ message: errorMessages.siteNotFound });
    }
    console.log("Drone Body", req.body)
    const drone = await droneRepository.createDrone(req.body);

    res.status(201).json(drone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: errorMessages.internalServerError });
  }
}

const updateDrone = async (req, res, next) => {
  const droneId = req.params.id;
  const body = req.body;

  try {
    console.log("Drone Id", droneId)
    console.log("Drone Body", body)
    await droneRepository.updateDrone(droneId, body);
    res.json({message : messages.droneUpdated});
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToUpdate });
  }
}

const deleteDrone = async (req, res, next) => {
  const droneId = req.params.id;
  try {
    console.log("Drone Id", droneId)
    const filter = {
      _id : droneId
    }
    await droneRepository.deleteDrones(filter);
    res.json({ message: messages.droneDeleted });
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToDelete });
  }
}

const getDroneById = async (req, res, next) => {
  const droneId = req.params.id;

  try {
    console.log("Drone Id", droneId)
    const filter = {
      _id: droneId
    }
    const drone = await droneRepository.getDrones(filter);
    if (!drone) {
      return res.status(404).json({ error: errorMessages.droneNotFound });
    }
    res.json(drone);
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToFetch });
  }
}

module.exports = {
  createDrone,
  updateDrone,
  deleteDrone,
  getDroneById
}

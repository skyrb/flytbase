const express = require('express');
const droneController = require('../../controllers/droneController');
const router = express.Router();


router.post('/', droneController.createDrone);
router.put('/:id', droneController.updateDrone);
router.get('/:id', droneController.getDroneById);
router.delete('/:id', droneController.deleteDrone);

module.exports = router;
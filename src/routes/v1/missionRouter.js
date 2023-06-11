const express = require('express');
const MissionController = require('../../controllers/MissionController');
const router = express.Router();


router.post('/', MissionController.createMission);
router.put('/:id', MissionController.updateMission);
router.get('/:id', MissionController.getMissionById);
router.delete('/:id', MissionController.deleteMission);


module.exports = router;
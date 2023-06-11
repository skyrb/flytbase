const express = require('express');
const siteController = require('../../controllers/siteController');
const router = express.Router();


router.post('/', siteController.createSite);
router.put('/:id', siteController.updateSite);
router.get('/:id', siteController.getSiteById);
router.delete('/:id', siteController.deleteSite);
router.get('/', siteController.getSitesByUser)
router.get('/:id/mission', siteController.getMissionBySite)
router.get('/:id/drone', siteController.getDroneBySite)

module.exports = router;
const express = require('express');
const categoryController = require('../../controllers/categoryController');
const router = express.Router();

router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/mission', categoryController.getMissionByCategory);
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;
const userRepository = require('../repository/userRepository');
const categoryRepository = require('../repository/CategoryRepository');
const errorMessages = require('../utils/errorMessages');
const missionRepository = require('../repository/missionRepository');
const messages = require('../utils/messages');


const createCategory = async (req, res, next) => {
  try {
    const userId = req.user._id
    console.log("userId", userId)
    const userFilter = {
      _id : userId
    }
    const user = await userRepository.getUsers(userFilter);
    if (!user.length) {
      return res.status(404).json({ message: errorMessages.userNotFound });
    }

    console.log("Req Body", req.body)
    const category = await categoryRepository.createCategory(userId, req.body);
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: errorMessages.internalServerError });
  }
}

const updateCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const body = req.body;

  try {
    console.log("Category Id", categoryId)
    console.log("Req Body", body)
    await categoryRepository.updateCategory(categoryId, body);
    res.json({message : messages.categoryUpdated});
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToUpdate });
  }
}

const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    console.log("Category Id", categoryId)
    await categoryRepository.deleteCategory(categoryId);
    res.json({ message: messages.categoryDeleted });
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToDelete });
  }
}

const getCategoriesByuser = async (req, res, next) => {
  try {
    const filter = {
      user : req.params.userId
    }
    const category = await categoryRepository.getCategories(filter);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToFetch });
  }
}

const getCategoryById = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    console.log("Category Id", categoryId)
    const filter = {
      _id : categoryId
    }
    const category = await categoryRepository.getCategories(filter);
    if (!category.length) {
      return res.status(404).json({ error: errorMessages.categoryNotFound });
    }
    res.json(category[0]);
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToFetch });
  }
}

const getMissionByCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const missionFilter = {
      category: categoryId
    }
    const missions = await missionRepository.getMissions(missionFilter);
    if (!missions) {
      return res.status(404).json({ error: errorMessages.missionNotFound });
    }
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedToFetch });
  }
}


module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategoriesByuser,
  getMissionByCategory
}

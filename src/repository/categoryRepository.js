const Category = require('../models/categories');

const createCategory = async (userId, CategoryData) => {
  const category = new Category(CategoryData);
  category.user = userId;
  return await category.save();
}

const updateCategory = async (categoryId, categoryData) => {
  return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
}

const deleteCategory = async (categoryId) => {
  return await Category.deleteOne({_id: categoryId});
}

const getCategories = async (filter) => {
  return await Category.find(filter);
}

module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories
}
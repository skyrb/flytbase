const Site = require('../models/sites');

const createSite = async (userId, siteData) => {
  const site = new Site(siteData);
  site.user = userId;
  return await site.save();
}

const updateSite = async (siteId, siteData) => {
  return await Site.findByIdAndUpdate(siteId, siteData, { new: true });
}

const deleteSite = async (siteId) => {
  return await Site.deleteOne({_id: siteId});
}

const getSites= async (filter) => {
  return await Site.find(filter);
}

module.exports = {
  createSite,
  updateSite,
  deleteSite,
  getSites
}
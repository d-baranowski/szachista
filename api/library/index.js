const data = require("./data/database-manager");
const generatePolicy = require("./auth/generatePolicy");
const getAuthentity = require("./auth/getAuthentity");

module.exports = {
  data: data,
  auth: {
    generatePolicy,
    getAuthentity
  }
};

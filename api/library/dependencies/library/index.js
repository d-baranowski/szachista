const uuidv1 = require("uuid/v1");
const data = require("./data/database-manager");
const generatePolicy = require("./auth/generatePolicy");
const getAuthentity = require("./auth/getAuthentity");
const authenticateToken = require("./auth/authenticate-token");
const sendResponse = require("./net/sendResponse");
const websocketSendMessages = require("./net/wesocketSendMessages");

module.exports = {
  data: data,
  auth: {
    generatePolicy,
    getAuthentity,
    authenticateToken
  },
  net: {
    websocketSendMessages: websocketSendMessages,
    sendResponse: sendResponse
  },
  log: console.log,
  uuid: uuidv1
};

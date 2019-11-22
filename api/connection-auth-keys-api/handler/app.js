"use strict";

console.log("Loading function");

const lib = require("/opt/library");
const router = require("./router");
const generateNewToken = require('./generateNewToken');
const validateEvent = require('./validateEvent');
const postHandler = require('./postHandler');


const appRouter = router({
  optionsHandler: (event, context, callback) => {
    return lib.net.sendResponse(200, "", callback);
  },
  notFoundHandler: (event, context, callback) => {
    return lib.net.sendResponse(404, `Unsupported method "${event.httpMethod}"`, callback);
  },

  postHandler: postHandler(lib, {
    generateNewToken: generateNewToken(lib),
    validateEvent: validateEvent(lib)
  })
});


exports.handler = async (event, context, callback) => {
  console.log("Event", event);
  await appRouter(event, context, callback);
};

"use strict";

console.log("Loading function");

const getAuthentity = require("./getAuthentity");
const handlePost = require("./requests/handlePost");
const handleGet = require("./requests/handleGet");
const sendResponse = require("./sendResponse");

const handlePut = (event, context, callback) => {

};

module.exports.handler = (event, context, callback) => {
  console.log("Event", event);

  if (event.httpMethod === "OPTIONS") {
    sendResponse(200, "", callback);
    return;
  }

  const authData = getAuthentity(event);

  if (authData.error) {
    console.log(authData);
    sendResponse(401, "Invalid authentity", callback);
    return;
  }

  if (event.requestContext.domainName !== "api.gierki.net") {
	console.log("Access attempted from wrong domain", event.requestContext.domainName);
    sendResponse(401, "Unauthorized Endpoint", callback);
    return;
  }

  switch (event.httpMethod) {
    case "GET":
      handleGet(event, context, callback, authData.authentity);
      break;
    case "POST":
      handlePost(event, context, callback, authData.authentity);
      break;
    case "PUT":
      handlePut(event, context, callback, authData.authentity);
      break;
    default:
      sendResponse(404, `Unsupported method "${event.httpMethod}"`, callback);
  }
};

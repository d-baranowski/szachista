"use strict";

console.log("Loading function");

const lib = require("szachista-lib");
const uuidv1 = require("uuid/v1");

exports.handler = (event, context, callback) => {
  console.log("Event", event);

  if (event.httpMethod !== "POST") {
    sendResponse(404, `Unsupported method "${event.httpMethod}"`, callback);
    return;
  }

  const authData = lib.auth.getAuthentity(event);

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

  if (event.requestContext.apiId !== "u28fta85u6") {
	console.log("Access attempted from wrong api", event.requestContext.apiId);
    sendResponse(401, "Unauthorized Endpoint", callback);
    return;
  }

  const accessData = {
    key: authData.authentity.Username,
    accessKey: uuidv1(),
    authContext: JSON.parse(event.body).authContext,
    authentity: JSON.stringify(authData.authentity)
  };

  lib.data.connection_auth_keys.saveItem(accessData).then(response => {
    console.log(response);
    sendResponse(200, accessData.accessKey, callback);
  }).catch(err => {
    console.log(err);
    sendResponse(500, "Unexpected Error", callback)
  });
};

function sendResponse(statusCode, message, callback) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
    }
  };
  callback(null, response);
}

"use strict";

const databaseManager = require("./database-manager");
const uuidv1 = require("uuid/v1");

exports.handler = async (event, context, callback) => {
  console.log("Event", event);

  if (event.httpMethod !== "POST") {
    sendResponse(404, `Unsupported method "${event.httpMethod}"`, callback);
    return;
  }

  const authentity = getAuthentity(event);

  if (authentity.error) {
    console.log(authentity);
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
    key: authentity.Username,
    accessKey: uuidv1(),
    chatId: JSON.parse(event.body).chatId,
    authentity: JSON.stringify(authentity)
  };

  databaseManager.saveItem(accessData).then(response => {
    sendResponse(200, authentity.Username, callback);
    return;
  });
};

const getAuthentity = event => {
  let authentity;
  let error;

  try {
    authentity =  { 
		...JSON.parse(event.requestContext.authorizer.stringified),
		requestId: event.requestContext.requestId,
		sourceIp: event.requestContext.identity.sourceIp,
		userAgent: event.requestContext.identity.userAgent
	};
  } catch (e) {
    error = e;
  }

  return {
    error,
    authentity
  };
};

function sendResponse(statusCode, message, callback) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
  callback(null, response);
}

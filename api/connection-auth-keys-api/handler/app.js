'use strict';

const databaseManager = require('./database-manager');
const authenticateToken = require('./authenticate-token');
const uuidv1 = require('uuid/v1');
const AWS = require('aws-sdk');


exports.handler = async (event, context, callback) => {
	console.log(event);

	if (event.httpMethod !== "POST") {
		sendResponse(404, `Unsupported method "${event.httpMethod}"`, callback);
		return;
	}

	var params = {
		AccessToken: event.body
	  };
	AWS.CognitoIdentityServiceProvider.getUser(params, (err, data) => {
		if (err) {
			console.log(err, err.stack); // an error occurred
		}
		else {
			console.log(data);  
			sendResponse(200, data); 
		}
	})

	/*const token = await authenticateToken.default(event.body).catch((error) => {
		console.log(error);
		sendResponse(403, error, callback);
	}); */

	

	/*switch (event.httpMethod) {
		case 'DELETE':
			deleteItem(event, callback);
			break;
		case 'GET':
			getItem(event, callback);
			break;
		case 'POST':
			saveItem(event, callback);
			break;
		case 'PUT':
			updateItem(event, callback);
			break;
		default:

	}*/
};

function saveItem(event, callback) {
	const item = JSON.parse(event.body);

	item.itemId = uuidv1();

	databaseManager.saveItem(item).then(response => {
		console.log(response);
		sendResponse(200, item.itemId, callback);
	});
}

function getItem(event, callback) {
	const itemId = event.pathParameters.id;

	databaseManager.getItem(itemId).then(response => {
		console.log(response);
		sendResponse(200, JSON.stringify(response), callback);
	});
}

function deleteItem(event, callback) {
	const itemId = event.pathParameters.itemId;

	databaseManager.deleteItem(itemId).then(response => {
		sendResponse(200, 'DELETE ITEM', callback);
	});
}

function updateItem(event, callback) {
	const itemId = event.pathParameters.itemId;

	const body = JSON.parse(event.body);
	const paramName = body.paramName;
	const paramValue = body.paramValue;

	databaseManager.updateItem(itemId, paramName, paramValue).then(response => {
		console.log(response);
		sendResponse(200, JSON.stringify(response), callback);
	});
}

function sendResponse(statusCode, message, callback) {
	const response = {
		statusCode: statusCode,
		body: JSON.stringify(message)
	};
	callback(null, response);
}

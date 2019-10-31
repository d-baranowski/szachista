'use strict';

const AWS = require('aws-sdk');

const CONNECTION_AUTH_KEYS_TABLE_NAME = 'connection_auth_keys';
const CHESS_LOBBY_TABLE_NAME = 'chess_lobby';

module.exports.getConnectionAuthByUserId = key => {
	let dynamo;

	try {
		dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}

	const params = {
		TableName: CONNECTION_AUTH_KEYS_TABLE_NAME,
		Key: {
			"key": key
		}
	};

	return dynamo.get(params).promise();
};

module.exports.deleteConnectionAuthKey = key => {
	let dynamo;

	try {
		dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}

	const params = {
		TableName: CONNECTION_AUTH_KEYS_TABLE_NAME,
		Key: {
			"key": key
		}
	};

	return dynamo.delete(params).promise();
};

module.exports.getChessGame = itemId => {
	let dynamo;

	try {
		dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}

	const params = {
		KeyConditionExpression: '#key = :itemId',
		ExpressionAttributeNames: { "#key": "key" },
		ExpressionAttributeValues: {
			':itemId' : itemId
		},
		TableName: CHESS_LOBBY_TABLE_NAME
	};

	return dynamo.query(params).promise()
};

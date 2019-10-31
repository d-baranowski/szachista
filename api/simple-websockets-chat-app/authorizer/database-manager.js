'use strict';

const AWS = require('aws-sdk');

const TABLE_NAME = 'connection_auth_keys';

module.exports.getItem = key => {
	let dynamo;

	try {
		dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}

	const params = {
		TableName: TABLE_NAME,
		Key: {
			key: key
		}
	};

	return dynamo.get(params).promise();
};

module.exports.deleteItem = key => {
	let dynamo;

	try {
		dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}

	const params = {
		TableName: TABLE_NAME,
		Key: {
			"key": key
		}
	};

	return dynamo.delete(params).promise();
};

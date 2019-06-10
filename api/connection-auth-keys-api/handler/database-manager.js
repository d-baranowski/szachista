'use strict';

const AWS = require('aws-sdk');

const TABLE_NAME = 'connection_auth_keys';

module.exports.saveItem = item => {
	let dynamo;

	try {
		dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}

	const params = {
		TableName: TABLE_NAME,
		Item: item
	};

	return dynamo.put(params).promise()
};

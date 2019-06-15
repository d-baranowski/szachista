'use strict';

const AWS = require('aws-sdk');

const TABLE_NAME = process.env.TABLE_NAME;

module.exports.saveItem = item => {
	let dynamo;

	try {
		dynamo = new AWS.DynamoDB.DocumentClient({region: process.env.AWS_REGION});
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

'use strict';

const AWS = require('aws-sdk');

const TABLE_NAME = 'chess_lobby';

module.exports = {
	createItem: item => {
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
	},

	getActiveGames: (lastActivityThreshold) => {

		let dynamo;

		try {
			dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
		} catch (e) {
			console.log(e);
			return Promise.reject(e);
		}

		const params = {
			TableName: TABLE_NAME,
			IndexName: 'lastActivityKey',
			KeyConditionExpression: 'lastActivityDay = :lastActivityDay AND lastActivity > :lastActivityThreshold',
			ExpressionAttributeValues: {
				':lastActivityDay' : new Date(lastActivityThreshold).toISOString().substring(0, 10),
				':lastActivityThreshold' : lastActivityThreshold
			},
			Limit: 50
		};

		return dynamo.query(params).promise()
	},

	getItem: itemId => {
		let dynamo;

		try {
			dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
		} catch (e) {
			console.log(e);
			return Promise.reject(e);
		}

		const params = {
			Key: {
				key: itemId
			},
			TableName: TABLE_NAME
		};

		return dynamo.get(params).promise()
	},

	deleteItem:  itemId => {
		let dynamo;

		try {
			dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
		} catch (e) {
			console.log(e);
			return Promise.reject(e);
		}

		const params = {
			Key: {
				key: itemId
			},
			TableName: TABLE_NAME
		};

		return dynamo.delete(params).promise();
	},

	updateItem: (itemId, paramsName, paramsValue) => {
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
				key
			},
			ConditionExpression: 'attribute_exists(itemId)',
			UpdateExpression: 'set ' + paramsName + ' = :v',
			ExpressionAttributeValues: {
				':v': paramsValue
			},
			ReturnValues: 'ALL_NEW'
		};

		return dynamo.update(params).promise()
	}
};
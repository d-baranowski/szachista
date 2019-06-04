'use strict';

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'connection_auth_keys';

module.exports.initializateDynamoClient = newDynamo => {
	dynamo = newDynamo;
};

module.exports.saveItem = item => {
	const params = {
		TableName: TABLE_NAME,
		Item: item
	};

	return dynamo
		.put(params)
		.promise()
		.then(() => {
			return item.itemId;
		});
};

module.exports.getItem = itemId => {
	const params = {
		Key: {
			key: itemId
		},
		TableName: TABLE_NAME
	};

	return dynamo
		.get(params)
		.promise()
		.then(result => {
			return result.Item;
		});
};

module.exports.deleteItem = itemId => {
	const params = {
		Key: {
			key: itemId
		},
		TableName: TABLE_NAME
	};

	return dynamo.delete(params).promise();
};

module.exports.updateItem = (itemId, paramsName, paramsValue) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			key: itemId
		},
		ConditionExpression: 'attribute_exists(key)',
		UpdateExpression: 'set ' + paramsName + ' = :v',
		ExpressionAttributeValues: {
			':v': paramsValue
		},
		ReturnValues: 'ALL_NEW'
	};

	return dynamo
		.update(params)
		.promise()
		.then(response => {
			return response.Attributes;
		});
};

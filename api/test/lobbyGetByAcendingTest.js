'use strict';

const AWS = require('aws-sdk');

const TABLE_NAME = 'chess_lobby';

let dynamo;

try {
    dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
} catch (e) {
    console.log(e);
    return Promise.reject(e);
}

const params = {
    TableName: TABLE_NAME,
    Limit: 100,
    IndexName: "lastActivity-index",
    KeyConditionExpression: "lastActivity > 1561523106362",
};

dynamo.get(params).promise().then(console.log).catch(console.error);

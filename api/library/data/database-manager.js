'use strict';

const AWS = require('aws-sdk');

const CONNECTION_AUTH_KEYS_TABLE_NAME = 'connection_auth_keys';
const CHESS_LOBBY_TABLE_NAME = 'chess_lobby';

module.exports = {
    connection_auth_keys: {
        getConnectionAuthByUserId: key => {
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
        },

        deleteConnectionAuthKey: key => {
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
        }
    },
    chess_lobby: {
        getChessGame: itemId => {
            let dynamo;

            try {
                dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
            } catch (e) {
                console.log(e);
                return Promise.reject(e);
            }

            const params = {
                KeyConditionExpression: '#key = :itemId',
                ExpressionAttributeNames: {"#key": "key"},
                ExpressionAttributeValues: {
                    ':itemId': itemId
                },
                TableName: CHESS_LOBBY_TABLE_NAME
            };

            return dynamo.query(params).promise()
        },
        saveChessConnection: (game, item) => {
            let dynamo;
            const NOW = Date.now();

            console.log("Old game", game);
            console.log("Connection info", item);

            try {
                dynamo = new AWS.DynamoDB.DocumentClient({region: process.env.AWS_REGION});
            } catch (e) {
                console.log(e);
                return Promise.reject(e);
            }

            const newConnections = game.playerConnections ? game.playerConnections : [];
            newConnections.push(item);

            const params = {
                TableName: CHESS_LOBBY_TABLE_NAME,
                Key: {
                    key: game.key,
                    createdTime: game.createdTime
                },
                UpdateExpression: "set playerConnections = :newConnections, lastActivity = :lastActivity, lastActivityDay = :lastActivityDay",
                ExpressionAttributeValues: {
                    ":newConnections": newConnections,
                    ":lastActivity": NOW,
                    ":lastActivityDay": new Date().toISOString().substr(0, 10)
                }
            };

            console.log("Params", params);

            return dynamo.update(params).promise();
        }
    }
};



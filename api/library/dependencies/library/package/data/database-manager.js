'use strict';

const AWS = require('aws-sdk');

const CONNECTION_AUTH_KEYS_TABLE_NAME = 'connection_auth_keys';
const CHESS_LOBBY_TABLE_NAME = 'chess_lobby';
const SIMPLE_CHAT_CONNECTIONS_TABLE =  "simplechat_connections";

module.exports = {
    connection_auth_keys: {
        saveItem: item => {
            let dynamo;

            try {
                dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
            } catch (e) {
                console.log("Failed to save connection auth keys",e);
                return Promise.reject(e);
            }

            const params = {
                TableName: CONNECTION_AUTH_KEYS_TABLE_NAME,
                Item: item
            };

            return dynamo.put(params).promise()
        },
        getConnectionAuth: (key, authContext) => {
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
                    "key": key,
                    "authContext": authContext
                }
            };

            return dynamo.get(params).promise();
        },

        deleteConnectionAuthKey: (key, authContext) => {
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
                    "key": key,
                    "authContext": authContext
                }
            };

            return dynamo.delete(params).promise();
        }
    },
    chess_lobby: {
        createItem: item => {
            let dynamo;

            try {
                dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
            } catch (e) {
                console.log(e);
                return Promise.reject(e);
            }

            const params = {
                TableName: CHESS_LOBBY_TABLE_NAME,
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
                TableName: CHESS_LOBBY_TABLE_NAME,
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
                TableName: CHESS_LOBBY_TABLE_NAME
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
                TableName: CHESS_LOBBY_TABLE_NAME,
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
        },

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
                dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
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
    },
    simplechat_connections: {
        saveItem: item => {
            let dynamo;

            try {
                dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-1"});
            } catch (e) {
                console.log(e);
                return Promise.reject(e);
            }

            const params = {
                TableName: SIMPLE_CHAT_CONNECTIONS_TABLE,
                Item: item
            };

            return dynamo.put(params).promise()
        }
    }
};







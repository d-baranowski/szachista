'use strict';

const AWS = require('aws-sdk');

const CONNECTION_AUTH_KEYS_TABLE_NAME = 'connection_auth_keys';
const CHESS_LOBBY_TABLE_NAME = 'chess_lobby';
const SIMPLE_CHAT_CONNECTIONS_TABLE =  "simplechat_connections";


const aws_local_config = {
    region: 'local',
    endpoint: 'http://localhost:8000'
};
const aws_sam_config = {
    region: 'sam',
    endpoint: 'http://dynamo:8000'
};

const getDynamoDbDocumentClient = () => {

    if (process.env['AWS_SAM_LOCAL']) {
        lib.log("Using local dynamodb 'http://dynamo:8000'");
        return new AWS.DynamoDB.DocumentClient(aws_sam_config);
    }

    if (process.env['APP_STAGE'] === 'local') {
        lib.log("Using local dynamodb 'http://localhost:8000'");
        return new AWS.DynamoDB.DocumentClient(aws_local_config);
    }

    return new AWS.DynamoDB.DocumentClient({ region: "eu-west-1"});
};

const listTables = () => {
    const dynamo = new AWS.DynamoDB();

    if (process.env['AWS_SAM_LOCAL']) {
        dynamo.endpoint = 'http://dynamo:8000';
    } else if (process.env['APP_STAGE'] === 'local') {
        // Use this when running code directly via node. Much faster iterations than using sam local
        dynamo.endpoint = 'http://localhost:8000';
    }

    dynamo.listTables({}, function(err, data) {
        if (err) {

            lib.log(err, err.stack);
        }
        else {
            lib.log(data);
        }
    })
};

module.exports = {
    listTables: listTables,
    connection_auth_keys: {
        saveItem: item => {
            let dynamo;

            try {
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log("Failed to save connection auth keys",e);
                return Promise.reject(e);
            }

            const params = {
                TableName: CONNECTION_AUTH_KEYS_TABLE_NAME,
                Item: item
            };

            return dynamo.put(params).promise()
        },
        getConnectionAuthByUserId: key => {
            let dynamo;

            try {
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log(e);
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
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log(e);
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
        createItem: item => {
            let dynamo;

            try {
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log(e);
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
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log(e);
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

        deleteItem:  (itemId, createdTime) => {
            let dynamo;

            try {
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log(e);
                return Promise.reject(e);
            }

            const params = {
                Key: {
                    key: itemId,
                    createdTime: createdTime
                },
                TableName: CHESS_LOBBY_TABLE_NAME
            };

            return dynamo.delete(params).promise();
        },

        updateItem: (itemId, paramsName, paramsValue) => {
            let dynamo;

            try {
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log(e);
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
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log(e);
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

            try {
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log(e);
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


            return dynamo.update(params).promise();
        }
    },
    simplechat_connections: {
        saveItem: item => {
            let dynamo;

            try {
                dynamo = getDynamoDbDocumentClient();
            } catch (e) {
                lib.log(e);
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


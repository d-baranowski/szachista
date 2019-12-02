const AWS = require('aws-sdk');

const sendMessages = async ({event, postData, connections, dropConnection}) => {
    let apiGatewayManagementApi;

    try {
        apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
        });
    } catch (e) {
        console.log("Failed to initialise apiGateway api")
        console.log(e);
        return Promise.reject(e)
    }

    const postCalls = connections.map(async ({connectionId}) => {
        try {
            console.log("Mappind post call for connection id " + connectionId);
            await apiGatewayManagementApi.postToConnection({
                ConnectionId: connectionId,
                Data: JSON.stringify(postData)
            }).promise();
        } catch (e) {
            if (e.statusCode === 410) {
                console.log(`Found stale connection, deleting ${connectionId}`);
                await dropConnection(connectionId);
            } else {
                console.log("Error sending message " + e);
                return Promise.reject(e);
            }
        }
    });

    return Promise.all(postCalls);
};

module.exports = sendMessages;

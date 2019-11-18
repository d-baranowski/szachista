const sendMessages = async (postData, connections, dropConnection) => {
    let apiGatewayManagementApi;

    try {
        apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
        });
    } catch (e) {
        return Promise.reject(e)
    }

    const postCalls = connections.map(async ({connectionId}) => {
        try {
            await apiGatewayManagementApi.postToConnection({
                ConnectionId: connectionId,
                Data: JSON.stringify(postData)
            }).promise();
        } catch (e) {
            if (e.statusCode === 410) {
                console.log(`Found stale connection, deleting ${connectionId}`);
                await dropConnection(connectionId);
            } else {
                return Promise.reject(e);
            }
        }
    });

    return Promise.all(postCalls);
};

module.exports = sendMessages;

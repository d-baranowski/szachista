const lambda = (lib) => async (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const chatId = event.queryStringParameters.chatId;
    const token = event.queryStringParameters.Authorizer;
    const userId = event.queryStringParameters.UserId;
    const sourceIp = event.requestContext.identity.sourceIp;
    const userAgent = event.requestContext.identity.userAgent;

    console.log("Retrieved auth information");

    let accessItem;
    try {
        const result = await lib.data.connection_auth_keys.getConnectionAuth(userId, chatId);
        accessItem = result.Item
    } catch (e) {
        console.log(e);
        callback("Unauthorised");
        return;
    }

    if (!accessItem) {
        console.log("No entry for user id");
        callback("Unauthorised");
        return
    }

    let accessKeyAuthorized = accessItem.accessKeys.filter( ak => ak.accessKey === token && lib.now() - ak.timestamp < 30000 ).length > 0;

    accessItem.accessKeys = accessItem.accessKeys.filter( ak =>  lib.now() - ak.timestamp < 30000);

    if (accessItem.accessKeys.length === 0) {
        lib.data.connection_auth_keys.deleteConnectionAuthKey(userId, chatId);
    } else {
        lib.data.connection_auth_keys.saveItem(accessItem)
    }

    let authentity;

    try {
        authentity = JSON.parse(accessItem.authentity)
    } catch (e) {
        console.log(e);
        callback("Unauthorised");
        return;
    }

    if (sourceIp !== authentity.sourceIp) {
        console.log("Wrong source ip", authentity.sourceIp);
        callback("Unauthorised");
        return;
    }

    if (userAgent !== authentity.userAgent) {
        console.log("Wrong user agent", accessItem.userAgent);
        callback("Unauthorised");
        return;
    }

    if (!accessKeyAuthorized) {
        console.log("Wrong access key", accessItem);
        callback("Unauthorised");
        return;
    }

    if (!chatId || !token) {
        console.log("Missing params", event.queryStringParameters);
        callback("Unauthorised");
        return;
    }

    if (chatId !== accessItem.authContext) {
        console.log("Wrong chatId", chatId);
        callback("Unauthorised");
        return;
    }

    console.log("Authorized");
    callback(null, lib.auth.generatePolicy('user', 'Allow', event.methodArn, accessItem));
};

module.exports = lambda;

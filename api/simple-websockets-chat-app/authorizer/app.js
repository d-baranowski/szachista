console.log('Loading function');

const lib = require("szachista-lib");

exports.handler = async function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const chatId = event.queryStringParameters.chatId;
    const token = event.queryStringParameters.Authorizer;
    const userId = event.queryStringParameters.UserId;
    const sourceIp = event.requestContext.identity.sourceIp;
    const userAgent = event.requestContext.identity.userAgent;

    if (!chatId || !token) {
        console.log("Missing params", event.queryStringParameters);
        callback("Unauthorised");
        return;
    }

    let accessItem;

    try {
        const result = await lib.data.connection_auth_keys.getConnectionAuthByUserId(userId);
        accessItem = result.Item
    } catch (e) {
        console.log(result);
        console.log(e);
        callback("Unauthorised");
        return;
    }

    try {
        lib.data.connection_auth_keys.deleteItem(userId);
    } catch (e) {
        console.log(e);
    }

    if (!accessItem) {
        console.log("No entry for user id");
        callback("Unauthorised");
        return
    }

    if (token !== accessItem.accessKey) {
        console.log("Wrong access key", accessItem);
        callback("Unauthorised");
        return;
    }

    if (chatId !== accessItem.authContext) {
        console.log("Wrong chatId", chatId);
        callback("Unauthorised");
        return;
    }

    let authentity;

    try {
        authentity = JSON.parse(accessItem.authentity)
    } catch(e) {
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


    callback(null, lib.auth.generatePolicy('user', 'Allow', event.methodArn, accessItem));
};

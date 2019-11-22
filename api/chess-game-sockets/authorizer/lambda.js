

const lambda = (lib) =>  async function (event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const gameId = event.queryStringParameters.gameId;
    const token = event.queryStringParameters.Authorizer;
    const userId = event.queryStringParameters.UserId;
    const sourceIp = event.requestContext.identity.sourceIp;
    const userAgent = event.requestContext.identity.userAgent;

    let accessItem;
    try {
        const result = await lib.data.connection_auth_keys.getConnectionAuth(userId, gameId);
        accessItem = result.Item
    } catch (e) {
        console.log(result);
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
        lib.data.connection_auth_keys.deleteConnectionAuthKey(userId, gameId);
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

    if (!gameId || !token) {
        console.log("Missing params", event.queryStringParameters);
        callback("Unauthorised");
        return;
    }

    if (gameId !== accessItem.authContext) {
        console.log("Wrong gameId", gameId);
        callback("Unauthorised");
        return;
    }

    let chessGame;

    try {
        const result = await lib.data.chess_lobby.getChessGame(gameId);
        chessGame = result.Items[0];
    } catch (e) {
        console.log("Failed to fetch the game by id " + gameId);
        console.log(e);
        callback("Unauthorised");
        return;
    }

    if (!chessGame) {
        console.log("Game not found " + gameId);
        callback("Unauthorised");
        return;
    }

    if (chessGame.playerTwoUsername !== userId && chessGame.playerOneUsername !== userId) {
        console.log("User not in the lobby");
        callback("Unauthorised");
        return;
    }

    callback(null, lib.auth.generatePolicy('user', 'Allow', event.methodArn, accessItem));
};

module.exports = lambda;

const playerReadyAction = require("./playerReadyAction");

const actionRouter = (lib) => (messageContext) => {
    if (messageContext.action === "READY") {
        return playerReadyAction(lib)(messageContext)
    }
};


const lambda = (lib) => async (event, context) => {
    console.log("Received Event", event);

    const authData = lib.auth.getAuthentity(event);

    if (authData.error) {
        console.log(authData);
        throw authData.error;
    }

    let authentity;

    try {
        authentity = JSON.parse(authData.authentity.authentity);
    } catch (e) {
        console.log("Failed to parse user authentity" + authData + "\n" + e);
        return {statusCode: 500, body: "Failed to parse user authentity"}
    }

    let message;
    try {
        message = JSON.parse(event.body)
    } catch (e) {
        console.log("Failed to parse message body", e);
        return {statusCode: 500, body: "Failed to send due to error " + e}
    }

    let chessGame;
    try {
        chessGame = await lib.data.chess_lobby.getChessGame(message.data.gameId).then(res => res.Items[0]);
    } catch (e) {
        console.log(e);
    }

    let messageContext = {authentity, chessGame, message, action: message.data.action, event};

    if (chessGame.playerOneUsername === authentity.Username) {
        messageContext.player = "playerOne"
    } else if (chessGame.playerTwoUsername === authentity.Username) {
        messageContext.player = "playerTwo"
    } else {
        console.log("User is not a player in this game " + authentity.Username);
        return {statusCode: 500, body: "User is not a player in this game"}
    }

    return await actionRouter(lib)(messageContext)
};

module.exports = lambda;

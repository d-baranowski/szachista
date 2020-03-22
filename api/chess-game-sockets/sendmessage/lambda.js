const gameStartAction = require("./gameStartAction");
const playerReadyAction = require("./playerReadyAction");
const playerJoinedGameAction = require("./playerJoinedGameAction");
const chessPieceMoveAction = require("./chessPieceMoveAction");
const playerTimedOutAction = require("./playerTimedOutAction");

const actionRouter = (lib) => (messageContext) => {
    try {
        if (messageContext.action === "READY") {
            console.log("Performing ready action");
            return playerReadyAction(lib)(messageContext)
        }
        else if (messageContext.action === "JOINED_GAME") {
            console.log("Performing joined game action");
            return playerJoinedGameAction(lib)(messageContext)
        }
        else if (messageContext.action === "GAME_START") {
            console.log("Performing game start action");
            return gameStartAction(lib)(messageContext)
        }
        else if (messageContext.action === "CHESS_PIECE_MOVE") {
            console.log("Performing move action");
            return chessPieceMoveAction(lib)(messageContext)
        }
        else if (messageContext.action === "PLAYER_TIMED_OUT") {
            console.log("Performing player timed out action");
            return playerTimedOutAction(lib)(messageContext)
        } else {
            return {statusCode: 200, body: "Unknown action noop"}
        }
    } catch (err) {
        console.log("Unexpected error caught");
        console.log(err)
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

    console.log(authentity);

    const userAttributes = authentity.UserAttributes.reduce((object, value) => {
        return {
            ...object,
            [value.Name]: value.Value
        };
    }, {});

    let messageContext = {userAttributes, authentity, chessGame, message, action: message.data.action, event};

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

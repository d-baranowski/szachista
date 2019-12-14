const actionHandler = (lib) => async (messageContext) => {
    const dropConnection = (connectionId) => {
        lib.data.chess_lobby.dropChessConnection(messageContext.chessGame, connectionId)
    };

    const message = {
        type: "PLAYER_JOINED",
        payload: {
            playerSeat: messageContext.player,
            gameId: messageContext.chessGame.key,
            playerUsername: messageContext.authentity.Username,
            picture: messageContext.userAttributes.picture
        }
    };

    try {
        await lib.net.websocketSendMessages({
            postData: message,
            connections: messageContext.chessGame.playerConnections,
            dropConnection,
            event: messageContext.event
        })
    } catch (e) {
        return {statusCode: 500, body: "Failed to send socket messages to players "}
    }

    return {statusCode: 200, body: "Successfully notified other players about joining"}
};


module.exports = actionHandler;

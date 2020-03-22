const calculatePlayersTimeUsed = require("./helpers/calculatePlayersTimeUsed");

const actionHandler = (lib) => {
    const sendMessage = async (messageContext, message) => {
        const dropConnection = (connectionId) => {
            lib.data.chess_lobby.dropChessConnection(messageContext.chessGame, connectionId)
        };

        console.log("Notifying players " + message);
        await lib.net.websocketSendMessages({
            postData: message,
            connections: messageContext.chessGame.playerConnections,
            dropConnection,
            event: messageContext.event
        })
    };

    return async (messageContext) => {
        const now = Date.now();
        const chessGame = messageContext.chessGame;
        const gameState = messageContext.chessGame.gameState;
        const key = chessGame.key;
        const createdTime = chessGame.createdTime;


        let timesUsed;
        console.log("calculating players times used");
        try {
            timesUsed = calculatePlayersTimeUsed(gameState.log);
        } catch (e) {
            console.log("Error caught when calculating times used")
        }

        console.log("Times used calculated " + JSON.stringify(timesUsed));
        if (timesUsed) {
            for (let [user, time] of Object.entries(timesUsed)) {
                if (time > chessGame.timeAllowed) {
                    let maxTimeUsed = 0;
                    let loser = "";

                    Object.entries(timesUsed).forEach(([username, timeUsed]) => {
                        if (timeUsed > maxTimeUsed) {
                            maxTimeUsed = timeUsed;
                            loser = username;
                        }
                    });

                    gameState.log.push({
                        timestamp: now,
                        fen: gameState.fen,
                        event: "VICTORY_OUT_OF_TIME",
                        turn: gameState.turn,
                        loser: loser
                    });

                    gameState.timesUsed = timesUsed;

                    // Update the state
                    try {
                        console.log(await lib.data.chess_lobby.updateGameState(key, createdTime, gameState));
                    } catch (e) {
                        console.log(e);
                        return {statusCode: 500, body: "Failed to update game state"}
                    }

                    const message = {
                        type: "VICTORY_OUT_OF_TIME",
                        payload: {
                            timestamp: now,
                            gameId: messageContext.chessGame.key,
                            timesUsed,
                            loser: loser
                        }
                    };

                    try {
                        await sendMessage(messageContext, message);
                        return {statusCode: 200, body: "Successfully notified other players about joining"}
                    } catch (e) {
                        console.log(e);
                        return {statusCode: 500, body: "Failed to send socket messages to players "}
                    }
                }
            }
        } else {
            console.log("Times used unable to calculate");
            return {statusCode: 500, body: "Failed to determine the winner due to times used missing"}
        }
    };
};


module.exports = actionHandler;

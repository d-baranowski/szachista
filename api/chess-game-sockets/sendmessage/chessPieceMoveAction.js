const Chess = require('chess.js').Chess;
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

    async function timeOut(gameState, now, playerMove, nextPlayer, nextFen, key, createdTime, messageContext, timesUsed) {

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
            move: playerMove,
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
                move: playerMove,
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

    async function moveSuccessful(gameState, now, playerMove, nextPlayer, nextFen, key, createdTime, messageContext, timesUsed) {
        gameState.log.push({
            timestamp: now,
            move: playerMove,
            fen: gameState.fen,
            event: "PLAYER_MOVED",
            turn: gameState.turn
        });

        gameState.turn = nextPlayer;
        gameState.fen = nextFen;
        gameState.timesUsed = timesUsed;

        // Update the state
        try {
            console.log(await lib.data.chess_lobby.updateGameState(key, createdTime, gameState));
        } catch (e) {
            console.log(e);
            return {statusCode: 500, body: "Failed to update game state"}
        }


        const message = {
            type: "MOVE_MADE",
            payload: {
                timestamp: now,
                move: playerMove,
                gameId: messageContext.chessGame.key,
                fen: nextFen,
                turn: nextPlayer,
                timesUsed
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

    return async (messageContext) => {
        const now = Date.now();
        const chessGame = messageContext.chessGame;
        const username = messageContext.authentity.Username;
        const playerMove = messageContext.message.data.payload.move;
        const suggestedNewState = messageContext.message.data.payload.suggestedNewState;
        const gameState = messageContext.chessGame.gameState;
        const key = chessGame.key;
        const createdTime = chessGame.createdTime;

        if (gameState.turn !== username) {
            console.log("Wrong user's turn");
            return {
                statusCode: 400,
                body: "This is not this users turn"
            }
        }

        const chess = new Chess(gameState.fen);
        const moveResult = chess.move(playerMove);
        const nextFen = chess.fen();

        if (suggestedNewState !== nextFen) {
            console.log("Invalid state");
            return {
                statusCode: 400,
                body: "Unexpected game state"
            }
        }

        const nextPlayer = username === gameState.white ? gameState.black : gameState.white;

        if (!moveResult) {
            console.log("Invalid move");
            return {
                statusCode: 400,
                body: "Invalid move"
            }
        }

        const timesUsed = calculatePlayersTimeUsed([...gameState.log, {
            timestamp: now,
            move: playerMove,
            fen: gameState.fen,
            event: "PLAYER_MOVED",
            turn: gameState.turn
        }]);

        if (timesUsed) {
            for (let [user, time] of Object.entries(timesUsed)) {
                if (time > chessGame.timeAllowed) {
                    return timeOut(gameState, now, playerMove, nextPlayer, nextFen, key, createdTime, messageContext, timesUsed);
                }
            }
        }


        return await moveSuccessful(gameState, now, playerMove, nextPlayer, nextFen, key, createdTime, messageContext, timesUsed);
    };
};


module.exports = actionHandler;

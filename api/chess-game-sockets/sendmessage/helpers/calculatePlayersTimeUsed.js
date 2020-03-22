
const findPreviousRelevantEvent = (gameLog, index) => {
    const event = gameLog[index];

    for (let i = index - 1; i > 0; i--) {
        const prevEvent = gameLog[i];

        if (prevEvent.turn !== event.turn && prevEvent.event === "PLAYER_MOVED") {
            return prevEvent;
        }
    }
};

const calculatePlayersTimeUsed = (gameLog) => {
    const timeUsed = {};

    let i = 0;
    while (i < gameLog.length) {
        const gameLogEntry = gameLog[i];

        if (!timeUsed[gameLogEntry.turn]) {
            timeUsed[gameLogEntry.turn] = 0;
        }

        if (gameLogEntry.event === "GAME_START") {
            const nextEvent = gameLog[i + 1];

            if (!nextEvent) {
                timeUsed[gameLogEntry.turn] += Date.now() - gameLogEntry.timestamp;
            } else {
                timeUsed[gameLogEntry.turn] += nextEvent.timestamp - gameLogEntry.timestamp;
            }

            i+= 2;
        } else {
            const previousRelevantEvent = findPreviousRelevantEvent(gameLog, i);

            timeUsed[gameLogEntry.turn] += gameLogEntry.timestamp - previousRelevantEvent.timestamp;
            i++;
        }
    }

    return timeUsed;
};


module.exports = calculatePlayersTimeUsed;

import React, {useEffect, useState} from 'react';
import "./PlayerTimers.css"
import gameStore, {sendPlayerTimedOutAction} from "../lobby/GameStore";

interface Props {
    timesUsed: any
    playerOneUsername: string
    playerTwoUsername: string
    activePlayer: string
    timeAllowed: number
}

const PlayerTimers: React.FC<Props> =
    ({
         timesUsed = {},
         playerOneUsername,
         playerTwoUsername,
         activePlayer,
         timeAllowed
    }) => {
        const [elapsed, setElapsed] = useState(0);
        const [sent, setSent] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                setElapsed(elapsed + 100)
            }, 100);
        });

        let playerOneTimeLeft = timeAllowed;
        let playerTwoTimeLeft = timeAllowed;

        if (timesUsed) {
            playerOneTimeLeft = timeAllowed - (timesUsed[playerOneUsername] || 0) - (activePlayer == playerOneUsername ? elapsed : 0);
            playerTwoTimeLeft = timeAllowed - (timesUsed[playerTwoUsername] || 0) - (activePlayer == playerTwoUsername ? elapsed : 0);
        }

        if (playerOneTimeLeft < 0) {
            playerOneTimeLeft = 0
        }

        if (playerTwoTimeLeft < 0) {
            playerTwoTimeLeft = 0
        }

        const playerOneDisplayTime = new Date(playerOneTimeLeft || 1).toISOString().substr(14, 5);
        const playerTwoDisplayTime = new Date(playerTwoTimeLeft || 1).toISOString().substr(14, 5);

        if (playerOneDisplayTime == "00:00" || playerTwoDisplayTime == "00:00") {
            if (!sent) {
                setSent(true);
                gameStore.dispatch(sendPlayerTimedOutAction())
            }

        }

        return (
            <div className="player-timers">
                <div className="player-one">{playerOneDisplayTime}</div>
                <div style={{color: "#37ebae", fontWeight: "bolder"}}>$200</div>
                <div className="player-two">{playerTwoDisplayTime}</div>
            </div>
        )
    };

export default PlayerTimers;

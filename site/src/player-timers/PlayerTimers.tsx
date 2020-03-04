import React, {useEffect, useState} from 'react';
import "./PlayerTimers.css"

interface Props {
    timesUsed: any
    playerOneUsername: string
    playerTwoUsername: string
    activePlayer: string
    timeAllowed: number
}

const PlayerTimers: React.FC<Props> =
    ({
         timesUsed,
         playerOneUsername,
         playerTwoUsername,
         activePlayer,
         timeAllowed
    }) => {
        const [elapsed, setElapsed] = useState(0);

        useEffect(() => {
            setTimeout(() => {
                setElapsed(elapsed + 100)
            }, 100);
        });

        const playerOneTimeLeft = timeAllowed - (timesUsed[playerOneUsername] || 0) - (activePlayer == playerOneUsername ? elapsed : 0);
        const playerTwoTimeLeft = timeAllowed - (timesUsed[playerTwoUsername] || 0) - (activePlayer == playerTwoUsername ? elapsed : 0);

        const playerOneDisplayTime = new Date(playerOneTimeLeft || 0).toISOString().substr(14, 5);
        const playerTwoDisplayTime = new Date(playerTwoTimeLeft || 0).toISOString().substr(14, 5);

        return (
            <div className="player-timers">
                <div className="player-one">{playerOneDisplayTime}</div>
                <div style={{color: "#37ebae", fontWeight: "bolder"}}>$200</div>
                <div className="player-two">{playerTwoDisplayTime}</div>
            </div>
        )
    };

export default PlayerTimers;

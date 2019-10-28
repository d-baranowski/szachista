import React from 'react';
import "./GameRoomName.css"

type Props = {
    gameName: string
}

const GameRoomName: React.FunctionComponent<Props> = (props) => (
    <div className="game-room-name">
        {props.gameName}
    </div>
);

export default GameRoomName;
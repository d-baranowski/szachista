import React from 'react';
import "./GameRoom.css";
import {Clock, Eye, Lock, Money} from "../icons";
import {IActiveGame} from "./ActiveGamesStore";
import PlayerInfo from "./PlayerInfo";
import GameInfo from "./GameInfo";
import GameRoomName from "./GameRoomName";

type Props = {
    game: IActiveGame,
    onClick: () => void
}


const GameRoom: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div onClick={props.onClick} className="game-room">
            <PlayerInfo
                playerOnePicture={props.game.playerOnePicture}
                playerTwoPicture={props.game.playerTwoPicture}
            />
            <GameRoomName gameName={props.game.gameName} />
            <GameInfo
                password={props.game.password}
                timeAllowed={props.game.timeAllowed}
                tokensToEnter={props.game.tokensToEnter}
            />
        </div>
    )
};

export default GameRoom;

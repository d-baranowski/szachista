import React from 'react';
import "./GameRoom.css";
import {Clock, Eye, Lock, Money} from "../icons";
import {IActiveGame} from "./ActiveGamesStore";
import moment from "moment";
import PlayerInfo from "./PlayerInfo";

type Props = {
    game: IActiveGame
}

const GameRoom: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div className="game-room">
            <PlayerInfo
                playerOnePicture={props.game.playerOnePicture}
                playerTwoPicture={props.game.playerTwoPicture}
            />
            <div className="label">
                {props.game.gameName}
            </div>

            <div className="game-info">
                <div>
                    <div className="icon-row">
                        <Clock/>
                        <p>{moment.duration(props.game.timeAllowed).humanize()}</p>
                    </div>
                    <div className="icon-row">
                        <Money/>
                        <p>{props.game.tokensToEnter}</p>
                    </div>
                </div>
                <div>
                    <div className="icon-row">
                        <Eye/>
                        <p>0 viewers</p>
                    </div>
                    {props.game.password !== "NOTREQUIRED"
                    && (
                        <div className="icon-row">
                            <Lock/>
                            <p>Password Required</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default GameRoom;
import React from 'react';
import "./GameRoom.css";
import {Clock, Eye, Lock, Money} from "../icons";
import {IActiveGame} from "./ActiveGamesStore";
import moment from "moment";

type Props = {
    game: IActiveGame
}

const GameRoom: React.FunctionComponent<Props> = (props: Props) => {
    return (

        <div className="game-room">
            <div className="player-info">
                <div className="player-one">
                    <img className="player-avatar" title="Daniel" alt="Daniel"
                         src={props.game.playerOnePicture}/>
                </div>
                <img className="vs" src="/vs.svg"/>
                <div className="player-two">
                    <img className="player-avatar" title="Daniel" alt="Daniel"
                         src="/question.svg"/>
                </div>
            </div>
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
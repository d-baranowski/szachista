import React from 'react';
import "./PlayerInfo.css"
import VS from "./VS";

type Props = {
    playerOnePicture?: string,
    playerTwoPicture?: string
}

const PlayerInfo: React.FunctionComponent<Props> = (props) => (
    <div className="player-info">
        <div className="player-one">
            <img className="player-avatar"
                 src={props.playerOnePicture || "/question.svg"}/>
        </div>
        <div className="vs">
            <VS/>
        </div>
        <div className="player-two">
            <img className="player-avatar"
                 src={props.playerTwoPicture || "/question.svg"}/>
        </div>
    </div>
);

export default PlayerInfo;

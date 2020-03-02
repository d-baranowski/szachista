import React from 'react';
import "./PlayerInfo.css"
import VS from "./VS";

type Props = {
    style?: React.CSSProperties,
    playerOnePicture?: string,
    playerTwoPicture?: string
    playerOneHighlight?: boolean,
    playerTwoHighlight?: boolean
}

const notReady = {
    transition: "box-shadow 0.5s ease-in-out",
};

const highlightShadow = {
    transition: "box-shadow 0.5s ease-in-out",
    boxShadow: "0 0 10px 1px green"
};

const PlayerInfo: React.FunctionComponent<Props> = (props) => {
    return (
        <div style={props.style} className="player-info">
            <div className="player-one">
                <img className="player-avatar"
                     style={props.playerOneHighlight ? highlightShadow : notReady}
                     src={props.playerOnePicture || "/question.svg"}/>
            </div>
            <div className="vs">
                <VS/>
            </div>
            <div className="player-two">
                <img className="player-avatar"
                     style={props.playerTwoHighlight ? highlightShadow : notReady}
                     src={props.playerTwoPicture || "/question.svg"}/>
            </div>
        </div>
    );
};

export default PlayerInfo;

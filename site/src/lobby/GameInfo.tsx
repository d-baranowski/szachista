import React from 'react';
import "./GameInfo.css";
import moment from "moment";
import {Clock, Eye, Lock, LockOpen, Money} from "../icons";

type Props = {
    passwordRequired: boolean,
    timeAllowed: number,
    tokensToEnter: number
}

const GameInfo: React.FunctionComponent<Props> = (props) => {
    const passString = props.passwordRequired ? "required" : "not required";
    const LockIcon = props.passwordRequired ? Lock : LockOpen;

    return (
        <div className="game-info">
            <div>
                <div className="icon-row">
                    <Clock/>
                    <p>{moment.duration(props.timeAllowed).humanize()}</p>
                </div>
                <div className="icon-row">
                    <Money/>
                    <p>{props.tokensToEnter}</p>
                </div>
            </div>
            <div>
                <div className="icon-row">
                    <Eye/>
                    <p>0 viewers</p>
                </div>
                <div className="icon-row">
                    <LockIcon/>
                    <p>{passString}</p>
                </div>
            </div>
        </div>
    )
};

export default GameInfo;

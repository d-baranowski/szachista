import React from 'react';
import "./GameInfo.css";
import moment from "moment";
import {Clock, Eye, Lock, Money} from "../icons";

type Props = {
    password: string,
    timeAllowed: number,
    tokensToEnter: number
}

const GameInfo: React.FunctionComponent<Props> = (props) => (
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
            {props.password !== "NOTREQUIRED"
            && (
                <div className="icon-row">
                    <Lock/>
                    <p>Password Required</p>
                </div>
            )}
        </div>
    </div>
);

export default GameInfo;

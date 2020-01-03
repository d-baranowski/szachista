import React from 'react';
import "./Activities.css";
import {ChatBubble, List, Tokens} from "../icons";
import ChatWidowContainer from "../chat/containers/ChatWindowContainer";
import TokensMenu from "../tokens-menu/TokensMenu";

interface Props {
    toggleEvents: () => void
}


const Activities = (props:Props) => {
    return (
        <div className="activities">
            <div className="activities-container">
                <div onClick={props.toggleEvents} className="button">
                    <List/>
                    <div>Events</div>
                </div>
                <div className="button">
                    <TokensMenu />
                    <div>Tokens</div>
                </div>
                <div className="button">
                    <ChatWidowContainer/>
                    <div>Chat</div>
                </div>
            </div>
        </div>
    );
};

export default Activities;

import React from 'react';
import "./Activities.css";
import {ChatBubble, List, Tokens} from "../icons";
import ChatWidowContainer from "../chat/containers/ChatWindowContainer";

const Activities = () => {
    return (
        <div className="activities">
            <div className="activities-container">
                <div className="button">
                    <List/>
                    <div>Events</div>
                </div>
                <div className="button">
                    <Tokens/>
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

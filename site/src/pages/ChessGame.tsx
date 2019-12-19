import React from 'react';
import ChessBoard from "../chess/ChessBoard";
import PlayerInfo from "../lobby/PlayerInfo";
import ChatWidowContainer from "../chat/containers/ChatWindowContainer";
import "./ChessGame.css"

const ChessGame = () => (
    <div>
        <PlayerInfo style={{margin: 5}} />
        <ChessBoard />
        <ChatWidowContainer/>
    </div>
);

export default ChessGame;

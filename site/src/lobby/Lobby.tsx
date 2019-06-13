import React, {Component} from 'react';
import ChatWidowContainer from "../chat/containers/ChatWindowContainer";
import ChessGame from "../chess/ChessGame";

class Lobby extends Component {
    render() {
        return (
            <div>
                <ChessGame />
                <ChatWidowContainer/>
            </div>
        );
    }
}

export default Lobby;
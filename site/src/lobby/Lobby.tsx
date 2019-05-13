import React, {Component} from 'react';
import ChatWindow from "../chat/components/ChatWindow";

class Lobby extends Component {
    render() {
        return (
            <div>
                <ChatWindow
                    showEmoji={true}
                    isOpen={true}
                    agentProfile={{
                        teamName: "Chess Lobby",
                        imageUrl: "http://placekitten.com/200/300"
                    }}
                />
            </div>
        );
    }
}

export default Lobby;
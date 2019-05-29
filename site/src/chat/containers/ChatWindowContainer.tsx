import React from 'react';
import ChatWindow from "../../chat/components/ChatWindow";
import createStore from "../../state/createStore";
import ConnectionManager from "../connection/ConnectionManager";
import connect from "../../state/connect";

const chatLobbyStore = createStore({
    messages: []
});

const subscritpion = ConnectionManager.subscribe({
    onStatusChange: (status) => {
        console.log(status);
        chatLobbyStore.messages = [...chatLobbyStore.messages, {type: 'text', data: {text: "Connection " + JSON.stringify(status)}}]
    },
    address: process.env.REACT_APP_CHAT_WEB_SOCKET_ADDRESS as string,
    onMessage: (message) => {
        console.log(message);
        chatLobbyStore.messages = [...chatLobbyStore.messages, {type: 'text', data: {text: JSON.stringify(message.data)}}]
    }
});

interface Props {
    address: string,
    chatTitle: string,
    messages: []
}

const ChatWidowContainer: React.FunctionComponent<Props> = (props) => {
    console.log(props.messages);

    return <ChatWindow
        messageList={props.messages}
        onUserInputSubmit={() => {subscritpion.send({"data" : "I can put whatever I want in here" , "message" : "sendmessage"})}}
        onClose={()=>{}}
        showEmoji={true}
        isOpen={true}
        agentProfile={{
            teamName: "Chess Lobby",
            imageUrl: "http://placekitten.com/200/300"
        }}
    />
};


export default connect(chatLobbyStore, ChatWidowContainer);
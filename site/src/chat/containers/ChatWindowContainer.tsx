import React, {CSSProperties, useEffect, useState} from 'react';
import ChatWindow from "../../chat/components/ChatWindow";
import createStore from "../../state/createStore";
import ConnectionManager, {ISubscriptionControls} from "../connection/ConnectionManager";
import connect from "../../state/connect";
import UserDetailStore, {IUserDetail} from "../../auth/UserDetailStore";

const chatLobbyStore = createStore({
    messages: []
});

let subscription: ISubscriptionControls;

type message = {
    author: IUserDetail
    data: {
        text: string
    }
    type: string
}

interface Props {
    address: string,
    chatTitle: string,
    messages: message[],
    user: IUserDetail
}

const iconStyle: CSSProperties = {
    width: "fit-content",
    position: "absolute",
    right: 15,
    bottom: 15,
};

const ChatWidowContainer: React.FunctionComponent<Props> = (props) => {
    useEffect(() => {
        subscription = ConnectionManager.subscribe({
            onStatusChange: (event) => {
                console.log(event);
                chatLobbyStore.messages = [...chatLobbyStore.messages, {type: 'text', data: {text: "Connection " + JSON.stringify(event.status)}}]
            },
            address: process.env.REACT_APP_CHAT_WEB_SOCKET_ADDRESS as string,
            onMessage: (message) => {
                console.log(message);
                chatLobbyStore.messages = [...chatLobbyStore.messages, JSON.parse(message.data)]
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    const [isOpen, setIsOpen] = useState(true);

    const onInput = (e: message) => {
        if (!props.user.name) {
            chatLobbyStore.messages = [...chatLobbyStore.messages, {type: "text", data: {text: "Please log in"}}];
            return
        }
        const payload: message = {
            ...e,
            author: props.user
        };
        subscription.send({
            "data": JSON.stringify(payload),
            "message": "sendmessage"
        })
    };

    return (
        <>
            <ChatWindow
                me={props.user}
                messageList={props.messages}
                onUserInputSubmit={onInput}
                onClose={() => {
                    setIsOpen(false)
                }}
                showEmoji={true}
                isOpen={isOpen}
                agentProfile={{
                    teamName: "Chess Lobby",
                    imageUrl: "http://placekitten.com/200/300"
                }}
            />
            {!isOpen && (
                <div style={iconStyle} onClick={() => setIsOpen(true)}>
                    <img className="sc-header--img" src={"http://placekitten.com/200/300"} alt="" />
                </div>
            )}
        </>
    )
};


export default connect(UserDetailStore, connect(chatLobbyStore, ChatWidowContainer));
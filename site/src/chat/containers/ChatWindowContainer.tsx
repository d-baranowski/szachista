import React, {CSSProperties, useEffect, useState} from 'react';
import ChatWindow from "../../chat/components/ChatWindow";
import createStore from "../../state/createStore";
import connect from "../../state/connect";
import UserDetailStore, {IUserDetail} from "../../auth/UserDetailStore";
import ManagedSocketConnection, {IConnection} from "../../sockets/ManagedSocketConnection";
import uuidv4 from "../../util/uuid";
import {getParams} from "../connection/GetChatParams";

const chatLobbyStore = createStore({
    messages: {},
    status: "CLOSED"
});

let subscription: IConnection;

type message = {
    id: string,
    timestamp: number,
    author: IUserDetail
    data: {
        text: string
    }
    type: string,
    delivered: boolean
}

interface Props {
    address: string,
    chatTitle: string,
    messages: {
        [id: string]: message
    },
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
        subscription = ManagedSocketConnection({
            getParams,
            onStatusChange: (event) => {
                console.log(event);
                chatLobbyStore.status = event.status
            },
            address: process.env.REACT_APP_CHAT_WEB_SOCKET_ADDRESS as string,
            onMessage: (message) => {
                console.log(message);
                const msg = JSON.parse(message.data);

                chatLobbyStore.messages = {
                    ...chatLobbyStore.messages,
                    [msg.id]: msg
                }
            }
        });

        return () => {
            subscription.close();
        }
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const onInput = (e: message) => {
        if (!props.user.name) {
            const msg = {
                id: uuidv4(),
                type: "text",
                data: {
                    text: "Please log in"
                },
                timestamp: Date.now(),
            };
            chatLobbyStore.messages = {
                ...chatLobbyStore.messages,
                [msg.id]: msg
            };

            return
        }

        const payload: message = {
            ...e,
            id: uuidv4(),
            timestamp: Date.now(),
            author: props.user,
            delivered: true
        };

        chatLobbyStore.messages = {
            ...chatLobbyStore.messages,
            [payload.id]: {
                ...payload,
                delivered: false
            }
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
                messageList={Object.values(props.messages).sort((a, b) => a.timestamp - b.timestamp)}
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

// @ts-ignore

import chatAuthKeyFetch from "../chat-auth-key-fetcher/chatAuthKeyFetch";
import User, {EMPTY_USER_INFO} from "../../auth/User";
import ErrorHandler from "../../error/ErrorHandler";

export interface IConnection {
    send: (msg: any) => void,
    close: () => void
}

type IManagedSocketConnectionProps = {
    address: string,
    onMessage: (message: any) => void,
    onStatusChange: (message: any) => void
}
type IManagedSocketConnection = (props: IManagedSocketConnectionProps) => IConnection

const getParams = async () => {
    const chatId = "chess-lobby";

    let Authorizer: string;

    try {
        Authorizer = await chatAuthKeyFetch({chatId});
    } catch (e) {
        ErrorHandler.handle(e);
        return null;
    }

    if (!Authorizer) {
        return null;
    }

    let UserId;

    try {
        const userInfo = User.getUserInfo();
        UserId = userInfo !== EMPTY_USER_INFO ? userInfo["cognito:username"] : null;
    } catch (e) {
        ErrorHandler.handle(e);
        return null;
    }

    if (!UserId) {
        return null;
    }

    return `?Authorizer=${Authorizer}&UserId=${UserId}&chatId=${chatId}`
};

const ManagedSocketConnection: IManagedSocketConnection = (props) => {
    let ws: WebSocket | null = null;

    const start = () => {
        return new Promise((resolve, reject) => {
            getParams().then(params => {
                if (!params) {
                    reject("No params");
                    return;
                }

                ws = new WebSocket(encodeURI(props.address + params));
                ws.onopen = function (event) {
                    props.onStatusChange({status: 'open', event});
                    resolve();
                };

                ws.onclose = function (event) {
                    props.onStatusChange({status: 'close', event});
                    ws = null;
                };

                ws.onerror = function (event) {
                    props.onStatusChange({status: 'error', event});
                    ws = null;
                };

                ws.onmessage = function (event) {
                    props.onMessage(event);
                };
            }).catch(err => {
                ErrorHandler.handle(err);
            });
        });
    };

    // noinspection JSIgnoredPromiseFromCall
    start().catch(err => {
        ErrorHandler.handle(err);
    });

    return {
        send: (msg: any) => {
            return new Promise((resolve, reject) => {
                if (ws && ws.readyState == ws.OPEN) {
                    ws.send(JSON.stringify(msg));
                    resolve();
                } else {
                    start().then(() => {
                        ws && ws.send(JSON.stringify(msg));
                        resolve();
                    }).catch(reject);
                }
            })
        },
        close: () => {
            ws && ws.close();
            ws = null;
        }
    };
};

export default ManagedSocketConnection;
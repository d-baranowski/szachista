// @ts-ignore

import ErrorHandler from "../error/ErrorHandler";

export interface IConnection {
    send: (msg: any) => void,
    close: () => void
}

type IManagedSocketConnectionProps = {
    address: string,
    getParams: () => Promise<string|null>
    onMessage: (message: any) => void,
    onStatusChange: (message: any) => void
}
type IManagedSocketConnection = (props: IManagedSocketConnectionProps) => IConnection

const ManagedSocketConnection: IManagedSocketConnection = (props) => {
    let ws: WebSocket | null = null;

    const start = () => {
        return new Promise((resolve, reject) => {
            props.getParams().then(params => {
                if (!params) {
                    reject("No params");
                    return;
                }

                if (ws) {
                    ws.onmessage = () => {};
                    ws.onerror = () => {};
                    ws.onopen = () => {};
                    ws.onclose = () => {};
                    ws.close();
                    ws = null
                }

                ws = new WebSocket(encodeURI(props.address + params));
                ws.onopen = function (event) {
                    props.onStatusChange({status: 'open', event});
                    resolve();
                };

                ws.onclose = function (event) {
                    props.onStatusChange({status: 'close', event});
                };

                ws.onerror = function (event) {
                    props.onStatusChange({status: 'error', event});
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

import WebSocket from "ws";

export interface IConnection {
    send: (msg: any) => void,
    close: () => void
}

type IManagedSocketConnection = (address: string, onMessage: (message: any) => void) => IConnection

const ManagedSocketConnection: IManagedSocketConnection = (address, onMessage) => {
    const ws = new WebSocket(address);

    ws.on('open', function open() {

    });

    ws.on('message', function incoming(data) {
        onMessage(data);
        console.log(data);
    });


    return {
        send: (msg: any) => {
            ws.send(msg);
        },
        close: () => {
        }
    }
};

export default ManagedSocketConnection;
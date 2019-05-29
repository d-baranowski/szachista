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

const ManagedSocketConnection: IManagedSocketConnection = (props) => {
    const socket = new WebSocket(props.address);
    let isOpen = false;

    socket.onopen = function (event) {
        isOpen = true;
        props.onStatusChange({status: 'open', event});
    };

    socket.onclose = function (event) {
        isOpen = false;
        props.onStatusChange({status: 'close', event});
    };

    socket.onerror = function (event) {
        props.onStatusChange({status: 'error', event});
    };

    socket.onmessage = function (event) {
        props.onMessage(event);
    };

    return {
        send: (msg: any) => {
            if (isOpen) {
                socket.send(JSON.stringify(msg))
            }
        },
        close: () => {
            socket.close();
        }
    }
};

export default ManagedSocketConnection;
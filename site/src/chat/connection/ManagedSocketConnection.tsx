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
    let ws: WebSocket | null = null;

    function start(){
        ws = new WebSocket(props.address);
        ws.onopen = function (event) {
            props.onStatusChange({status: 'open', event});
        };

        ws.onclose = function (event) {
            props.onStatusChange({status: 'close', event});
            check();
        };

        ws.onerror = function (event) {
            props.onStatusChange({status: 'error', event});
        };

        ws.onmessage = function (event) {
            props.onMessage(event);
        };
    }

    function check(){
        if(!ws || ws.readyState == WebSocket.CLOSED) start();
    }

    start();

    const intervalId = setInterval(check, 5000);

    return {
        send: (msg: any) => {
            if (ws && ws.readyState == ws.OPEN) {
                ws.send(JSON.stringify(msg))
            } else {
                check();
            }
        },
        close: () => {
            clearInterval(intervalId);
            ws && ws.close();
            ws = null;
        }
    }
};

export default ManagedSocketConnection;
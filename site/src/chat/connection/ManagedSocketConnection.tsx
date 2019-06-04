// @ts-ignore
import base65536 from "base65536";
import User from "../../auth/User";


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

function _base64ToArrayBuffer(base64: string) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

const ManagedSocketConnection: IManagedSocketConnection = (props) => {
    let ws: WebSocket | null = null;
    let reconnectRetries = 0;

    function start() {
        if (reconnectRetries > 3) {
            clearInterval(intervalId);
            ws = null;
            return;
        }

        const token = User.getJWT();
        if (!token) {
            props.onStatusChange({status: 'unauthorized'});
            return
        }

        console.log(base65536.encode(_base64ToArrayBuffer(token)).length);
        console.log(token.length);

        ws = new WebSocket(encodeURI(props.address + `?Authorizer=${token}`));
        ws.onopen = function (event) {
            props.onStatusChange({status: 'open', event});
            reconnectRetries = 0;
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
    }

    function check() {
        if (!ws || ws.readyState == WebSocket.CLOSED) {
            start();
            reconnectRetries++;
        }
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
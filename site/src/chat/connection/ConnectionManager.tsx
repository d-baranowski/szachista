import uuid from "../../util/uuid";
import ErrorHandler from "../../error/ErrorHandler";
import managedSocketConnection, {IConnection} from "./ManagedSocketConnection";


interface ISubscription {
    address: string,
    filter: (message: any) => boolean,
    onMessage: (message: any) => void
}

interface IConnections {
    [address: string]: {
        connection: IConnection,
        subscriptions: {
            [id: string]: (message: any) => void
        }
    }
}

interface IConnectionManager {
    connections: IConnections
    subscribe: (subscription: ISubscription) => {
        send: (msg: any) => void,
        unsubscribe: () => void
    }
}

class ConnectionManager implements IConnectionManager {
    connections: IConnections = {};

    callback  = (address: string) => {
        this.connections[address].subscriptions
    };

    subscribe = (subscription: ISubscription) => {
        const subId = uuid();
        if (!this.connections[subscription.address]) {
            this.connections[subscription.address] = {
                connection: managedSocketConnection(subscription.address, this.callback),
                subscriptions: {
                    [subId]: (message: any) => {
                        try {
                            if (subscription.filter(message)) {
                                subscription.onMessage(message)
                            }
                        } catch (e) {
                            ErrorHandler.handle(e);
                        }

                    }
                }
            }
        }

        return {
            send: this.connections[subscription.address].connection.send,
            unsubscribe: () => {
                const connectionData = this.connections[subscription.address];
                delete connectionData.subscriptions[subId];

                if (Object.keys(connectionData.subscriptions).length == 0) {
                    connectionData.connection.close();
                }
            }
        };
    }
}
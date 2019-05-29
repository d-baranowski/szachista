import uuid from "../../util/uuid";
import managedSocketConnection, {IConnection} from "./ManagedSocketConnection";


interface ISubscription {
    address: string,
    onMessage: (message: any) => void,
    onStatusChange: (status: any) => void,
}

interface IConnections {
    [address: string]: {
        connection: IConnection,
        subscriptions: {
            [id: string]: ISubscription
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

    onMessage = (address: string) => (message: any) => {
        Object.entries(this.connections[address].subscriptions).forEach(([key, value]) => {
            value.onMessage(message)
        })
    };

    onStatusChange = (address: string) => (status: any) => {
        Object.entries(this.connections[address].subscriptions).forEach(([key, value]) => {
            value.onStatusChange(status)
        })
    };

    subscribe = (subscription: ISubscription) => {
        const subId = uuid();

        if (!this.connections[subscription.address]) {
            this.connections[subscription.address] = {
                connection: managedSocketConnection({
                    address: subscription.address,
                    onMessage: this.onMessage(subscription.address),
                    onStatusChange: this.onStatusChange(subscription.address)
                }),
                subscriptions: {
                    [subId]: subscription
                }
            }
        } else {
            this.connections[subscription.address].subscriptions[subId] = subscription
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

export default new ConnectionManager();
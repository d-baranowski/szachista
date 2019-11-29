import uuid from '../util/uuid';

const createStore = (storeProps: any) => {
    const subscribers: {
        [key: string]: any;
    } = {};

    const notifySubscribers = (newValue: any) => {
        Object.values(subscribers).forEach(callback => callback(newValue))
    };

    const handler = {
        set(target: any, prop: string, value: any) {
            if ((prop === 'subscribe')) { return true }

            target[prop] = value;
            notifySubscribers(target);
            return true;
        }
    };

    return new Proxy({
        subscribe: (callback: (newValue: any) => any) => {
            const id = uuid();
            subscribers[id] = callback;
            return () => delete subscribers[id];
        },
        ...storeProps
    }, handler);
};

export default createStore;
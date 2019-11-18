import {IActiveGame} from "../lobby/ActiveGamesStore";
import ManagedSocketConnection, {IConnection} from "./ManagedSocketConnection";
import {getParams} from "./GetGameParams";


class GameManager {
    socketConnection: IConnection | undefined;

    joinGame(response: IActiveGame) {
        this.socketConnection = ManagedSocketConnection({
            getParams: getParams(response.key),
            address: "wss://4ig0y3nt75.execute-api.eu-west-1.amazonaws.com/Prod",
            onMessage: (message: any) => console.log,
            onStatusChange: (message: any) => console.log
        });



        return this.socketConnection;
    }
}

class Singleton {
    static instance: GameManager;

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new GameManager();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

export default Singleton;

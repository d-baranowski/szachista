import {IActiveGame} from "../lobby/ActiveGamesStore";
import ManagedSocketConnection, {IConnection} from "./ManagedSocketConnection";
import {getParams} from "./GetGameParams";
import gameStore, {
    gameCreated,
    gameSocketStatusChange,
    ICreateGameAction,
    IGameCreatedAction,
    showModal
} from "../lobby/GameStore";
import lobbyGameCreate from "../lobby/lobbyGameCreate";
import ErrorHandler from "../error/ErrorHandler";
import CreateGamesStore from "../lobby/CreateGameStore";


class GameManager {
    socketConnection: IConnection | undefined;

    constructor() {
        gameStore.registerMiddleware((action/*, newState */) => {
            if (action.type === "CREATE_GAME") {
                lobbyGameCreate((action as ICreateGameAction).payload).then((response) => {
                    CreateGamesStore.reset();
                    gameStore.dispatch(showModal(true));
                    gameStore.dispatch(gameCreated(response));

                }).catch((err) => {
                    ErrorHandler.handle(err);
                    CreateGamesStore.validationMsg = err;
                })
            }

            if (action.type === "GAME_CREATED") {
                const gameSocket = this.joinGame((action as IGameCreatedAction).payload);
                gameSocket.send({hello: "World", what: "is up", ziom: "Trollo"})
            }
        })
    }

    joinGame(response: IActiveGame) {
        this.socketConnection = ManagedSocketConnection({
            getParams: getParams(response.key),
            address: "wss://4ig0y3nt75.execute-api.eu-west-1.amazonaws.com/Prod",
            onMessage: console.log,
            onStatusChange: (event) => gameStore.dispatch(gameSocketStatusChange(event.status))
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

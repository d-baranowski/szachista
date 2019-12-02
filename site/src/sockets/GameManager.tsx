import {IActiveGame} from "../lobby/ActiveGamesStore";
import ManagedSocketConnection, {IConnection} from "./ManagedSocketConnection";
import {getParams} from "./GetGameParams";
import gameStore, {
    gameCreated,
    gameSocketStatusChange,
    ICreateGameAction,
    IGameCreatedAction, ISendPlayerReadyAction,
    showModal
} from "../lobby/GameStore";
import lobbyGameCreate from "../lobby/lobbyGameCreate";
import ErrorHandler from "../error/ErrorHandler";
import CreateGamesStore from "../lobby/CreateGameStore";

interface IGameReadySocketMessage {
    data: {
        gameId: string,
        action: string,
        payload: {
            readyState: boolean
        }
    },
    message: "sendmessage"
}

function readyStateMessage(gameId: string, readyState: boolean): IGameReadySocketMessage {
    return {
        "data": {
            "gameId": gameId,
            "action": "READY",
            "payload": {"readyState": readyState}
        }, "message": "sendmessage"
    };
}

class GameManager {
    socketConnection: IConnection | undefined;

    constructor() {
        gameStore.registerMiddleware((action/*, newState */) => {
            console.log("Middleware action handled", action);
            if (action.type === "CREATE_GAME") {
                lobbyGameCreate((action as ICreateGameAction).payload).then((response: IActiveGame) => {
                    CreateGamesStore.reset();
                    gameStore.dispatch(showModal(true));
                    gameStore.dispatch(gameCreated(response));

                }).catch((err: Error) => {
                    ErrorHandler.handle(err);
                    CreateGamesStore.validationMsg = "There was an error creating the game.";
                })
            }

            else if (action.type === "GAME_CREATED") {
                this.joinGame((action as IGameCreatedAction).payload);
            }

            else if (action.type === "SEND_PLAYER_READY_ACTION") {
                if (!this.socketConnection) { return; }

                const {
                    gameId,
                    readyState
                } = (action as ISendPlayerReadyAction).payload;

                this.socketConnection.send(readyStateMessage(gameId, readyState))
            }
        })
    }

    joinGame(response: IActiveGame) {
        this.socketConnection = ManagedSocketConnection({
            getParams: getParams(response.key),
            address: "wss://4ig0y3nt75.execute-api.eu-west-1.amazonaws.com/Prod",
            onMessage: (event) => {
                gameStore.dispatch(JSON.parse(event.data))
            },
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

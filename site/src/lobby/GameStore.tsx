import createStore from "../state/createStore";
import {IActiveGame} from "./ActiveGamesStore";
import uuid from "../util/uuid";
import {ILobbyParams} from "./lobbyGameCreate";

type State = {
    key: string,
    gameName: string,
    passwordRequired: boolean,
    playerOnePicture: string,
    playerOneUsername: string,
    playerOneReady: boolean,
    playerTwoPicture: string,
    playerTwoUsername: string,
    playerTwoReady: boolean,
    timeAllowed: number,
    tokensToEnter: number,
    showModal: boolean,
    socketConState: string
}

const defaultState: State = {
    key: "",
    gameName: "",
    passwordRequired: false,
    playerOnePicture: "",
    playerOneUsername: "",
    playerOneReady: false,
    playerTwoPicture: "",
    playerTwoUsername: "",
    playerTwoReady: false,
    timeAllowed: 0,
    tokensToEnter: 0,
    showModal: false,
    socketConState: "CONNECTION_NOT_ATTEMPTED"
};

export type IGameStore = {
    state: State,
    dispatch: (event: IAction) => void,
    registerMiddleware: (callback: (action: IAction, newState: State) => any) => () => void
}

interface IAction {
    type: string
}

export interface ISocketStatusChangeAction extends IAction {
    payload: string
}

export const gameSocketStatusChange: (payload: string) => ISocketStatusChangeAction = (payload) => ({
    type: "GAME_SOCKET_STATUS_CHANGE",
    payload
});

export interface ICreateGameAction extends IAction {
    payload: ILobbyParams
}

export const createGame: (payload: ILobbyParams) => ICreateGameAction = (payload) => ({
    type: "CREATE_GAME",
    payload
});

export interface IGameCreatedAction extends IAction {
    payload: IActiveGame
}

export const gameCreated: (payload: IActiveGame) => IGameCreatedAction = (payload: IActiveGame) => ({
    type: "GAME_CREATED",
    payload
});

interface IShowModalAction extends IAction {
    payload: boolean
}

export const showModal: (payload: boolean) => IShowModalAction = (payload) => ({
    type: "SHOW_MODAL",
    payload
});

const handleGameCreated: (state: State, action: IGameCreatedAction) => State = (state, action) => {
    return {
        ...state,
        key: action.payload.key,
        gameName: action.payload.gameName,
        passwordRequired: action.payload.password === "REQUIRED",
        playerOnePicture: action.payload.playerOnePicture,
        playerOneUsername: action.payload.playerOneUsername,
        playerOneReady: false,
        playerTwoPicture: action.payload.playerTwoPicture,
        playerTwoUsername: action.payload.playerTwoUsername,
        playerTwoReady: false,
        timeAllowed: action.payload.timeAllowed,
        tokensToEnter: action.payload.tokensToEnter,
    }
};

const handleShowModal: (state: State, action: IShowModalAction) => State = (state, action) => {
    return {
        ...state,
        showModal: action.payload
    }
};

const handleGameSocketStatusChange: (state: State, action: ISocketStatusChangeAction) => State = (state, action) => {
    return {
        ...state,
        socketConState: action.payload
    }
};

const middleware: {
    [key: string]: any;
} = {};

const callMiddleware = (action: IAction, newState: State) => {
    Object.values(middleware).forEach(callback => callback(action, newState))
};

const reduce: (state: State, action: IAction) => State = (state: State, action: IAction) => {
    let newState: State = defaultState;
    if (action.type === "GAME_CREATED") {
        newState = handleGameCreated(state, action as IGameCreatedAction);
    } else if (action.type === "SHOW_MODAL") {
        newState = handleShowModal(state, action as IShowModalAction);
    } else if (action.type === "GAME_SOCKET_STATUS_CHANGE") {
        newState = handleGameSocketStatusChange(state, action as ISocketStatusChangeAction);
    }

    callMiddleware(action, newState);
    return newState;
};


const gameStore: IGameStore = createStore({
    state: {},
    dispatch: (event: IAction) => {
        console.log(event);
        gameStore.state = reduce(gameStore.state, event)
    },
    registerMiddleware: (callback: (action: IAction, newState: State) => () => void) => {
        const id = uuid();
        middleware[id] = callback;
        return () => delete middleware[id];
    }
});

export default gameStore;

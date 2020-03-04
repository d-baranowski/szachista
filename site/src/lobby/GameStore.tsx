import createStore from "../state/createStore";
import {IActiveGame} from "./ActiveGamesStore";
import uuid from "../util/uuid";
import {ILobbyParams} from "./lobbyGameCreate";
import {IChessMove} from "../pages/ChessGame";

export type GameStoreState = {
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
    socketConState: string,
    gameHistory: IChessMove[],
    timesUsed: {
        [key:string]:number
    }
    gameState: {
        gameId: string,
        fen: string,
        turn: string
    }
}

const defaultState: GameStoreState = {
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
    socketConState: "CONNECTION_NOT_ATTEMPTED",
    gameHistory: [],
    timesUsed: {},
    gameState: {
        gameId: "",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        turn: ""
    }
};

export type IGameStore = {
    state: GameStoreState,
    dispatch: (event: IAction) => void,
    registerMiddleware: (callback: (action: IAction, newState: GameStoreState) => any) => () => void
}

export interface IAction {
    type: string
}

interface IPlayerReadyStateChanged extends IAction {
    payload: {
        player: string,
        gameId: string,
        ready: boolean
    }
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

interface ISendPlayerReadyActionPayload {
    gameId: string,
    readyState: boolean
}

export interface ISendPlayerReadyAction extends IAction {
    payload: ISendPlayerReadyActionPayload
}

export const sendPlayerReadyAction: (payload: ISendPlayerReadyActionPayload) => ISendPlayerReadyAction = (payload) => ({
    type: "SEND_PLAYER_READY_ACTION",
    payload: payload
});


interface ISendPlayerJoinedActionPayload {
    gameId: string
}

export interface ISendPlayerJoinedAction extends IAction {
    payload: ISendPlayerJoinedActionPayload
}

export const sendPlayerJoinedAction: (payload: ISendPlayerJoinedActionPayload) => ISendPlayerJoinedAction = (payload) => ({
    type: "SEND_PLAYER_JOINED_ACTION",
    payload: payload
});

interface ISendGameStartActionPayload {
    gameId: string
}

export interface ISendGameStartAction extends IAction {
    payload: ISendGameStartActionPayload
}

interface ISendGameStartActionPayload {
    gameId: string
}

export interface ISendGameStartAction extends IAction {
    payload: ISendGameStartActionPayload
}

export const sendGameStartAction: (payload: ISendGameStartActionPayload) => ISendGameStartAction = (payload) => ({
    type: "SEND_GAME_START_ACTION",
    payload: payload
});

export interface ISendChessPieceMoveActionPayload {
    gameId: string,
    move: IChessMove,
    suggestedNewState: string
}

export interface ISendChessPieceMoveAction extends IAction {
    payload: ISendChessPieceMoveActionPayload
}

export const sendChessPieceMoveAction: (payload: ISendChessPieceMoveActionPayload) => ISendChessPieceMoveAction = (payload) => ({
    type: "SEND_CHESS_PIECE_MOVE_ACTION",
    payload: payload
});

const handleGameCreated: (state: GameStoreState, action: IGameCreatedAction) => GameStoreState = (state, action) => {
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

const handleShowModal: (state: GameStoreState, action: IShowModalAction) => GameStoreState = (state, action) => {
    return {
        ...state,
        showModal: action.payload
    }
};

const handleGameSocketStatusChange: (state: GameStoreState, action: ISocketStatusChangeAction) => GameStoreState = (state, action) => {
    return {
        ...state,
        socketConState: action.payload
    }
};

function handlePlayerReadyStateChanged(state: GameStoreState, action: IPlayerReadyStateChanged): GameStoreState {
    return {
        ...state,
        [action.payload.player + "Ready"]: action.payload.ready
    };
}

function handleGameStarted(state: GameStoreState, action: IGameStarted): GameStoreState {
    return {
        ...state,
        gameState: action.payload
    }
}

function handlePlayerJoined(state: GameStoreState, action: IPlayerJoined): GameStoreState {
    return {
        ...state,
        [`${action.payload.playerSeat}Picture`]: action.payload.picture,
        [`${action.payload.playerSeat}Username`]: action.payload.playerUsername
    }
}

function handleMoveMade(state: GameStoreState, action: IMoveMade): GameStoreState {
    return {
        ...state,
        gameHistory: [ ...state.gameHistory, action.payload.move ],
        timesUsed: action.payload.timesUsed,
        gameState: {
            fen: action.payload.fen,
            gameId: action.payload.gameId,
            turn: action.payload.turn
        }
    }
}

const middleware: {
    [key: string]: any;
} = {};

const callMiddleware = (action: IAction, newState: GameStoreState) => {
    Object.values(middleware).forEach(callback => callback(action, newState))
};

interface IPlayerJoined extends IAction {
    type: "PLAYER_JOINED",
    payload: {
        playerSeat: "playerOne" | "playerTwo"
        gameId: string
        playerUsername: string
        picture: string
    }
}

interface IGameStarted extends IAction {
    type: "GAME_STARTED",
    payload: {
        gameId: string
        fen: string
        turn: string
    }
}

interface IMoveMade extends IAction {
    type: "MOVE_MADE",
    payload: {
        move: IChessMove,
        gameId: string,
        fen: string
        turn: string,
        timesUsed: {
            [key:string]:number
        }
    }
}

const reduce: (state: GameStoreState, action: IAction) => GameStoreState = (state: GameStoreState, action: IAction) => {
    let newState: GameStoreState = state || defaultState;
    if (action.type === "GAME_CREATED") {
        newState = handleGameCreated(state, action as IGameCreatedAction);
    } else if (action.type === "SHOW_MODAL") {
        newState = handleShowModal(state, action as IShowModalAction);
    } else if (action.type === "GAME_SOCKET_STATUS_CHANGE") {
        newState = handleGameSocketStatusChange(state, action as ISocketStatusChangeAction);
    } else if (action.type === "PLAYER_READY_STATE_CHANGED") {
        newState = handlePlayerReadyStateChanged(state, action as IPlayerReadyStateChanged);
    } else if (action.type === "PLAYER_JOINED") {
        newState = handlePlayerJoined(state, action as IPlayerJoined)
    } else if (action.type === "GAME_STARTED") {
        newState = handleGameStarted(state, action as IGameStarted)
    } else if (action.type === "MOVE_MADE") {
        newState = handleMoveMade(state, action as IMoveMade)
    }

    callMiddleware(action, newState);
    return newState;
};


const gameStore: IGameStore = createStore({
    state: defaultState,
    dispatch: (event: IAction) => {
        console.log(event);
        gameStore.state = reduce(gameStore.state, event)
    },
    registerMiddleware: (callback: (action: IAction, newState: GameStoreState) => () => void) => {
        const id = uuid();
        middleware[id] = callback;
        return () => delete middleware[id];
    }
});

export default gameStore;

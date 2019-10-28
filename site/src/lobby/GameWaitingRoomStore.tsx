import createStore from "../state/createStore";
import {IActiveGame} from "./ActiveGamesStore";

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
    showModal: boolean
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
    showModal: false
};

export type IGameWaitingRoomStore = {
    state: State,
    dispatch: (event: IAction) => void
}

interface IAction {
    type: string
}

interface IGameCreateAction extends IAction {
    payload: IActiveGame
}

export const gameCreated: (payload: IActiveGame) => IGameCreateAction = (payload: IActiveGame) => ({
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

const handleGameCreated: (state: State, action: IGameCreateAction) => State = (state, action) => {
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
        tokensToEnter:action.payload.tokensToEnter,
    }
};

const handleShowModal: (state: State, action: IShowModalAction) => State = (state, action) => {
    return {
        ...state,
        showModal: action.payload
    }
};

const reduce: (state: State, action: IAction) => State = (state: State, action: IAction) => {
    if (action.type === "GAME_CREATED") {
        return handleGameCreated(state, action as IGameCreateAction);
    } else if (action.type === "SHOW_MODAL") {
        return handleShowModal(state, action as IShowModalAction);
    }

    return defaultState;
};

const gameWaitingRoomStore: IGameWaitingRoomStore = createStore({
    state: {},
    dispatch: (event: IAction) => {
        gameWaitingRoomStore.state = reduce(gameWaitingRoomStore.state, event)
    }
});

export default gameWaitingRoomStore;
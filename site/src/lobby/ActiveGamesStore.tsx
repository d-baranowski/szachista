import createStore from "../state/createStore";

export interface IActiveGame {
    gameName: string,
    password: string,
    playerOnePicture: string,
    playerOneUsername: string,
    playerTwoPicture: string,
    playerTwoUsername: string
    lastActivity: number,
    lastActivityDay: string,
    timeAllowed: number,
    tokensToEnter: number,
    createdTime: number,
    key: string
}

export interface IActiveGamesStore {
    items: IActiveGame[],
    setActiveGames: (items: IActiveGame[]) => void
}

const ActiveGamesStore: IActiveGamesStore = createStore({
    items: [],
    setActiveGames: (items: IActiveGame[]) => {
        ActiveGamesStore.items = [...items]
    }
});

export default ActiveGamesStore;

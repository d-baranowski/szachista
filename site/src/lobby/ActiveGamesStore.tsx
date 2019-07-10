import createStore from "../state/createStore";

export interface IActiveGame {
    gameName: string,
    password: string,
    "playerOnePicture": string,
    "playerOneUsername": string,
    "playerTwoPicture": string,
    "playerTwoUsername": string
    "lastActivity": 1562450834003,
    "lastActivityDay": "2019-07-06",
    "timeAllowed": 323231,
    "tokensToEnter": 60,
    "createdTime": 1562450834003,
    "key": "68e7cd80-a03a-11e9-8b76-f77d46e5ca8b"
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
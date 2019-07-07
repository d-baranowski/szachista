import superagent from 'superagent';
import User from "../auth/User";
import {IActiveGame} from "./ActiveGamesStore";

type IFetchActiveGames = () => Promise<IActiveGame[]>

const fetchActiveGames: IFetchActiveGames = () => {
    return new Promise((accept, reject) => {
        const accessToken =  User.getAWSToken().access_token;

        if (!accessToken) {
            reject("User is not logged in")
        }

        superagent.get("https://api.gierki.net/chess-lobby")
            .set('Authorization', accessToken)
            .then((response) => accept(response.body), reject)
    });
};

export default fetchActiveGames;
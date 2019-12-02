import superagent from 'superagent';
import User from "../auth/User";
import {IActiveGame} from "./ActiveGamesStore";

type IJoinGame = (gameId: string) => Promise<IActiveGame>

const joinGame: IJoinGame = (gameId) => {
    return new Promise((accept, reject) => {
        const accessToken = User.getAWSToken().access_token;

        if (!accessToken) {
            reject("User is not logged in")
        }

        superagent.put("https://api.gierki.net/chess-lobby")
            .set('Authorization', accessToken)
            .send({gameId})
            .then((response) => accept(response.body), reject)
    });
};

export default joinGame;

import superagent from 'superagent';
import User from "../auth/User";
import {IActiveGame} from "./ActiveGamesStore";

export type ILobbyParams = {
    gameName: string,
    tokensToEnter: number|null,
    spectatorsAllowed: boolean,
    timeAllowed: number|null,
    password: string
}

const lobbyGameCreate = (params: ILobbyParams): Promise<IActiveGame> => {
    return new Promise((accept, reject) => {

        const accessToken =  User.getAWSToken().access_token;

        if (!accessToken) {
            reject("User is not logged in")
        }

        superagent.post("https://api.gierki.net/chess-lobby")
            .send(
                {
                    gameName: params.gameName,
                    tokensToEnter: params.tokensToEnter,
                    spectatorsAllowed: params.spectatorsAllowed,
                    timeAllowed: params.timeAllowed,
                    password: params.password
                }
            )
            .set('Authorization', accessToken)
            .then((response) => accept(response.body), reject)
    });
};

export default lobbyGameCreate;

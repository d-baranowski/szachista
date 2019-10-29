import superagent from 'superagent';
import User from "../User";

type IWebSocketsAuthKeyFetchParams = {
    authContext: string
}

const webSocketsAuthKeyFetch = (params: IWebSocketsAuthKeyFetchParams): Promise<string> => {
    return new Promise((accept, reject) => {

        const accessToken =  User.getAWSToken().access_token;

        if (!accessToken) {
            reject("User is not logged in")
        }

        superagent.post("https://api.gierki.net/connection-auth-keys/auth-key")
            .send(
                {
                    "authContext": params.authContext
                }
            )
            .set('Authorization', accessToken)
            .then((response) => accept(response.body), reject)
    });
};

export default webSocketsAuthKeyFetch;

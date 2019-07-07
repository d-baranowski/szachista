import superagent from 'superagent';
import User from "../../auth/User";

type IChatAuthKeyFetchParams = {
    chatId: string
}

const chatAuthKeyFetch = (params: IChatAuthKeyFetchParams): Promise<string> => {
    return new Promise((accept, reject) => {

        const accessToken =  User.getAWSToken().access_token;

        if (!accessToken) {
            reject("User is not logged in")
        }

        superagent.post("https://api.gierki.net/connection-auth-keys/auth-key")
            .send(
                {
                    "chatId": params.chatId
                }
            )
            .set('Authorization', accessToken)
            .then((response) => accept(response.body), reject)
    });
};

export default chatAuthKeyFetch;
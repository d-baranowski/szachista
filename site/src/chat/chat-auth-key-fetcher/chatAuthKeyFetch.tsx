import superagent from 'superagent';
import User from "../../auth/User";

type IChatAuthKeyFetchParams = {
    chatId: string
}

const chatAuthKeyFetch = (params: IChatAuthKeyFetchParams): Promise<string> => {
    return new Promise((accept, reject) => {
        superagent.post("https://api.gierki.net/connection-auth-keys/auth-key")
            .send(
                {
                    "chatId": params.chatId
                }
            )
            .set('Authorization', User.getAWSToken().access_token)
            .then((response) => accept(response.body), reject)
    });
};

export default chatAuthKeyFetch;
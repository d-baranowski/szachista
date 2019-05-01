import superagent from 'superagent';

interface IAwsTokenResponse {
    "access_token": string,
    "refresh_token": string,
    "id_token": string,
    "token_type": string,
    "expires_in": number
}

interface ITokenFetcher {
    getToken: (code: string) => Promise<IAwsTokenResponse>,
}

class TokenFetcher implements ITokenFetcher {
    getToken(code: string) {
        const promise = new Promise((accept, reject) => {
            superagent.post("https://logins.gierki.net/oauth2/token")
                .type('form')
                .set("Authorization", `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`)
                .send({ grant_type: 'authorization_code' })
                .send({ redirect_uri: process.env.REACT_APP_REDIRECT_URI })
                .send({code: code})
                .then(accept, reject)
        });

        return promise as Promise<IAwsTokenResponse>;
    }
}

export default new TokenFetcher();
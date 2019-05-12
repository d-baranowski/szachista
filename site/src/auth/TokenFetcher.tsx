import superagent from 'superagent';
import {IAwsTokenResponse} from "../model/IAwsTokenResponse";
import User from "./User";

interface ITokenFetcher {
    getToken: (code: string) => Promise<IAwsTokenResponse>,
    refreshToken: () => any,
}

class TokenFetcher implements ITokenFetcher {
    getToken(code: string) {
        const promise = new Promise((accept, reject) => {
            superagent.post("https://logins.gierki.net/oauth2/token")
                .type('form')
                .set("Authorization", `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`)
                .send({grant_type: 'authorization_code'})
                .send({redirect_uri: process.env.REACT_APP_REDIRECT_URI})
                .send({code: code})
                .then((response) => accept(response.body), reject)
        });

        return promise as Promise<IAwsTokenResponse>;
    }

    refreshToken() {
        const promise = new Promise((accept, reject) => {
            const refreshToken = User.getAWSToken().refresh_token;
            superagent.post("https://logins.gierki.net/oauth2/token")
                .type('form')
                .set("Authorization", `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`)
                .send({grant_type: 'refresh_token'})
                .send({refresh_token: refreshToken})
                .send({client_id: process.env.REACT_APP_CLIENT_ID})
                .then((response) => {
                    accept({
                        ...response.body,
                        refresh_token: refreshToken
                    })
                }, reject)
        });

        return promise as Promise<IAwsTokenResponse>;
    }
}

// @ts-ignore
window.TokenFetcher = new TokenFetcher();
export default new TokenFetcher();

//TODO https://www.integralist.co.uk/posts/cognito/#aws-hosted-ui
//TODO https://hackernoon.com/aws-cognito-user-pools-or-identity-pools-what-do-i-use-to-secure-my-api-1d69cfbe99e1

//TODO https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-userpools-server-contract-reference.html
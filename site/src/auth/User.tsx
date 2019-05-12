import Encryption from "./Encryption";
import {IAwsTokenResponse} from "../model/IAwsTokenResponse";
import jwt from "jsonwebtoken";
import {IIdTokenDeceoded} from "../model/IIdTokenDeceoded";

export const EMPTY_USER: IAwsTokenResponse = {
    "access_token": "",
    "refresh_token": "",
    "id_token": "",
    "token_type": "",
    "expires_in": 0
};

export const EMPTY_USER_INFO = {};

class User {
    getAWSToken(): IAwsTokenResponse {
        const key = process.env.REACT_APP_TOKEN_SESSION_STORE_KEY as string;
        const encryptedBase64EncodedJsonString = window.sessionStorage.getItem(key);

        if (!encryptedBase64EncodedJsonString) {
            return EMPTY_USER;
        }

        const base64EncodedJsonString = Encryption.decrypt(encryptedBase64EncodedJsonString);
        const jsonString = atob(base64EncodedJsonString);

        return JSON.parse(jsonString);
    }

    getUserInfo(): IIdTokenDeceoded | {} {
        const idToken = this.getAWSToken().id_token;

        if (!idToken) {
            return EMPTY_USER_INFO
        }

        return jwt.decode(idToken) as IIdTokenDeceoded;
    }

    // USE THIS TODO https://aws.amazon.com/blogs/mobile/integrating-amazon-cognito-user-pools-with-api-gateway/
    // THIS IS USEFUL too https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html#amazon-cognito-user-pools-using-tokens-step-2
}

export default new User();
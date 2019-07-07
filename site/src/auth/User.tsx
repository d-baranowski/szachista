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

export const EMPTY_USER_INFO: IIdTokenDeceoded = {
    "at_hash": "",
    "sub": "",
    "cognito:groups": [],
    "iss": "",
    "cognito:username": "",
    "given_name": "",
    "picture": "",
    "aud": "",
    "token_use": "",
    "auth_time": 0,
    "name": "",
    "exp": 0,
    "iat": 0,
    "family_name": "",
    "email": "",
    "identities": []
};

class User {
    getJWT(): string {
        const key = process.env.REACT_APP_TOKEN_SESSION_STORE_KEY as string;
        const encryptedBase64EncodedJsonString = window.sessionStorage.getItem(key);

        if (!encryptedBase64EncodedJsonString) {
            return "";
        }

        return Encryption.decrypt(encryptedBase64EncodedJsonString);
    }

    getAWSToken(): IAwsTokenResponse {
        const base64String = this.getJWT();

        if (!base64String) {
            return EMPTY_USER
        }

        const jsonString = atob(base64String);

        return JSON.parse(jsonString);
    }

    getUserInfo(): IIdTokenDeceoded {
        const idToken = this.getAWSToken().id_token;

        if (!idToken) {
            return EMPTY_USER_INFO
        }

        return jwt.decode(idToken) as IIdTokenDeceoded;
    }
}

export default new User();
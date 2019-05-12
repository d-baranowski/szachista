import createStore from "../state/createStore";
import {IIdTokenDeceoded} from "../model/IIdTokenDeceoded";

export interface IUserDetail {
    given_name: string,
    picture: string,
    token_use: string,
    auth_time: number,
    name: string,
    exp: number,
    family_name: string,
    email: string,
}

export interface IUserDetailStore {
    setUserDetail: (detail: IIdTokenDeceoded) => null
    user: IUserDetail
}

const UserDetailStore: IUserDetailStore = createStore({
    user: {
        given_name: "",
        picture: "",
        token_use: "",
        auth_time: 0,
        name: "",
        exp: 0,
        family_name: "",
        email: "",
    },
    setUserDetail: (detail: IIdTokenDeceoded) => {
        UserDetailStore.user = {
            given_name: detail.given_name,
            picture: detail.picture,
            token_use: detail.token_use,
            auth_time: detail.auth_time,
            name: detail.name,
            exp: detail.exp,
            family_name: detail.family_name,
            email: detail.email
        }
    }
});

export default UserDetailStore;
import createStore from "../state/createStore";
import {IIdTokenDeceoded} from "../model/IIdTokenDeceoded";

export interface IUserDetailStore {
    setUserDetail: (detail: IIdTokenDeceoded) => null
    user: {
        given_name: string,
        picture: string,
        token_use: string,
        auth_time: number,
        name: string,
        exp: number,
        family_name: string,
        email: string,
    }
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
        UserDetailStore.user.given_name = detail.given_name;
        UserDetailStore.user.picture = detail.picture;
        UserDetailStore.user.token_use = detail.token_use;
        UserDetailStore.user.auth_time = detail.auth_time;
        UserDetailStore.user.name = detail.name;
        UserDetailStore.user.exp = detail.exp;
        UserDetailStore.user.family_name = detail.family_name;
        UserDetailStore.user.email = detail.email;
    }
});

export default UserDetailStore;
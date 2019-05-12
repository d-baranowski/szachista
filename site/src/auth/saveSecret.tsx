import UserDetailStore from "./UserDetailStore";
import User, {EMPTY_USER_INFO} from "./User";
import {IIdTokenDeceoded} from "../model/IIdTokenDeceoded";

export default (value: any) => {
    const key = process.env.REACT_APP_TOKEN_SESSION_STORE_KEY as string;
    sessionStorage.setItem(key, value);

    const userDetail = User.getUserInfo();

    if (userDetail !== EMPTY_USER_INFO) {
        UserDetailStore.setUserDetail(userDetail as IIdTokenDeceoded);
    }
}
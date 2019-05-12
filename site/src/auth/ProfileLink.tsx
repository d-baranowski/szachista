import React from 'react';
import {Person} from "../icons";
import connect from "../state/connect";
import UserDetailStore, {IUserDetailStore} from "./UserDetailStore";
import "./ProfileLink.css"

const ProfileLink = (userInfo: IUserDetailStore) => {
    if (userInfo.user.picture) {
        return <img className="profile-picture"
                    title={userInfo.user.given_name}
                    alt={userInfo.user.given_name}
                    src={userInfo.user.picture} />
    } else {
        return (<a href={process.env.REACT_APP_LOGIN_URL as string}><Person/></a>)
    }
};

ProfileLink.propTypes = {};

export default connect(UserDetailStore, ProfileLink);
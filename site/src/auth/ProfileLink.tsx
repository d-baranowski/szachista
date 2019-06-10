import React from 'react';
import {Person} from "../icons";
import connect from "../state/connect";
import UserDetailStore, {IUserDetail} from "./UserDetailStore";
import "./ProfileLink.css"

const ProfileLink = (userInfo: IUserDetail) => {
    if (userInfo.picture) {
        return <img className="profile-picture"
                    title={userInfo.given_name}
                    alt={userInfo.given_name}
                    src={userInfo.picture} />
    } else {
        let loginUrl = process.env.REACT_APP_LOGIN_URL;
        loginUrl += "&scope=openid+profile+email+phone+aws.cognito.signin.user.admin"
        return (<a href={loginUrl as string}><Person/></a>)
    }
};

ProfileLink.propTypes = {};

const mapStateToProps = (state: any) => state.user;

export default connect(UserDetailStore, ProfileLink, mapStateToProps);
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
        return (<a href={process.env.REACT_APP_LOGIN_URL as string}><Person/></a>)
    }
};

ProfileLink.propTypes = {};

const mapStateToProps = (state: any) => state.user;

export default connect(UserDetailStore, ProfileLink, mapStateToProps);
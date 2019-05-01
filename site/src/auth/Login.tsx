import React, {Component} from 'react';
import Encryption from "./Encryption";
import {RouteComponentProps, withRouter} from "react-router";

import TokenFetcher from "./TokenFetcher";

interface MatchParams {
    code: string;
}

class Login extends Component<RouteComponentProps<MatchParams>> {

    render() {
        let queryParams = this.props.location.search;
        let urlParams = new URLSearchParams(queryParams);

        if (!urlParams.has('code')) {
            this.props.history.push("/");
        } else {
            const code = urlParams.get('code') as string;
            let tokenResponse = TokenFetcher.getToken(code);
            tokenResponse.then(value => {
                const key = process.env.REACT_APP_TOKEN_SESSION_STORE_KEY as string;
                window.sessionStorage.setItem(key, Encryption.encrypt(btoa(JSON.stringify(value))));
                this.props.history.push("/");
            });

            tokenResponse.catch((error) => {
                console.log(error);
            })
        }

        return (
            <div>

            </div>
        );
    }
}

export default withRouter(Login);
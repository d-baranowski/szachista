import React, {Component} from 'react';
import './App.css';
import Navbar from "./navbar/navbar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GamesList from "./games/GamesList";
import ChessGame from "./chess/ChessGame";
import Login from "./auth/Login"
import UserDetailStore from "./auth/UserDetailStore";
import User, {EMPTY_USER_INFO} from "./auth/User";
import {IIdTokenDeceoded} from "./model/IIdTokenDeceoded";


class App extends Component {
    componentDidMount(): void {
        const userInfo = User.getUserInfo();
        if (userInfo !== EMPTY_USER_INFO) {
            UserDetailStore.setUserDetail(userInfo as IIdTokenDeceoded);
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <div className="page-body">
                        <Route path="/" exact component={GamesList}/>
                        <Route path="/chess" exact component={ChessGame}/>
                        <Route path="/oauth2/idpresponse" component={Login}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;



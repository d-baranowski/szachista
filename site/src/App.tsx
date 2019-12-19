import React, {Component} from 'react';
import './App.css';
import Navbar from "./navbar/navbar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GamesList from "./pages/GamesList";
import Login from "./pages/Login"
import UserDetailStore from "./auth/UserDetailStore";
import User, {EMPTY_USER_INFO} from "./auth/User";
import {IIdTokenDeceoded} from "./model/IIdTokenDeceoded";
import setupTokenRefresh from "./auth/setupTokenRefresh";
import Lobby from "./pages/Lobby";
import GameManager from "../src/sockets/GameManager"
import ChessGame from "./pages/ChessGame";

class App extends Component {
    componentDidMount(): void {
        const userInfo = User.getUserInfo();
        if (userInfo !== EMPTY_USER_INFO) {
            UserDetailStore.setUserDetail(userInfo as IIdTokenDeceoded);
            setupTokenRefresh();
        }
        new GameManager().getInstance();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <div className="page-body">
                        <Route path="/" component={ChessGame}/>
                        <Route path="/shouldbeingex" exact component={GamesList}/>
                        <Route path="/chess" exact component={Lobby}/>
                        <Route path="/oauth2/idpresponse" component={Login}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;




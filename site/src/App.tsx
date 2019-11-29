import React, {Component} from 'react';
import './App.css';
import Navbar from "./navbar/navbar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GamesList from "./games/GamesList";
import Login from "./auth/Login"
import UserDetailStore from "./auth/UserDetailStore";
import User, {EMPTY_USER_INFO} from "./auth/User";
import {IIdTokenDeceoded} from "./model/IIdTokenDeceoded";
import setupTokenRefresh from "./auth/setupTokenRefresh";
import Lobby from "./lobby/Lobby";
import GameManager from "./sockets/GameManager";
import {GameWaitingRoom} from "./lobby/GameWaitingRoom";

class App extends Component {
    componentDidMount(): void {
        const userInfo = User.getUserInfo();
        if (userInfo !== EMPTY_USER_INFO) {
            UserDetailStore.setUserDetail(userInfo as IIdTokenDeceoded);
            setupTokenRefresh();
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <div className="page-body">
                        <Route path="/" exact component={GamesList}/>
                        <Route path="/chess" exact component={Lobby}/>
                        <Route path="/oauth2/idpresponse" component={Login}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;


// const debugState = '{"key":"d8595550-0ec9-11ea-8df5-8fcbaa5c60e4","gameName":"qweqqwe","passwordRequired":true,"playerOnePicture":"https://lh3.googleusercontent.com/a-/AAuE7mBWe1Nv4LxFR49rFB2ivmT8kHcau8HTZuwktORb=s96-c","playerOneUsername":"Google_109354484677663308178","playerOneReady":false,"playerTwoPicture":null,"playerTwoUsername":null,"playerTwoReady":false,"timeAllowed":1200000,"tokensToEnter":0,"showModal":true,"socketConState":"open"}';
//
// class App extends Component {
//     componentDidMount(): void {
//         const userInfo = User.getUserInfo();
//         if (userInfo !== EMPTY_USER_INFO) {
//             UserDetailStore.setUserDetail(userInfo as IIdTokenDeceoded);
//             setupTokenRefresh();
//         }
//         new GameManager().getInstance();
//     }
//
//     render() {
//         return (
//             <GameWaitingRoom
//                 registerMiddleware={(callback) => {
//                     return () => {};
//                 }}
//                 dispatch={() => {}}
//                 state={JSON.parse(debugState)}
//             />
//         );
//     }
// }
//
// export default App;
//
//

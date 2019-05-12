import React, {Component} from 'react';
import scriptjs from "scriptjs";
import "./chess.css"
import App from "./game/src/App";
import User from "../auth/User";

class ChessGame extends Component {
    componentDidMount() {
        scriptjs("/chess/js/bundle.js");
    }

    render() {
        console.log(User.getUserInfo());
        return (
            <div className="game-container">
                <App/>
            </div>
        );
    }
}

ChessGame.propTypes = {};

export default ChessGame;
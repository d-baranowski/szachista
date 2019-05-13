import React, {Component} from 'react';
import scriptjs from "scriptjs";
import "./chess.css"
import App from "./game/src/App";

class ChessGame extends Component {
    componentDidMount() {
        scriptjs("/chess/js/bundle.js");
    }

    render() {
        return (
            <div className="game-container">
                <App/>
            </div>
        );
    }
}

ChessGame.propTypes = {};

export default ChessGame;
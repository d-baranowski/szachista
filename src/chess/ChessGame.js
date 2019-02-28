import React, {Component} from 'react';
import scriptjs from "scriptjs";
import "./chess.css"

class ChessGame extends Component {
    componentDidMount() {
        scriptjs("/chess/js/bundle.js");
    }

    render() {
        return (
            <div className="game-container">
                <div id="chess-root" />
            </div>
        );
    }
}

ChessGame.propTypes = {};

export default ChessGame;
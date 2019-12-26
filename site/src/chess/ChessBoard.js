import React, {Component} from 'react';
import scriptjs from "scriptjs";
import "./chess.css"
import App from "./game/src/App";

class ChessBoard extends Component {
    componentDidMount() {
        scriptjs("/chess/js/bundle.js");
    }

    render() {
        return (
            <div className="game-screen">
                <div className="game-container">
                    <App onChessMove={this.props.onChessMove}/>
                </div>
            </div>
        );
    }
}

export default ChessBoard;

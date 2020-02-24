import React, {Component} from 'react';
import scriptjs from "scriptjs";
import "./chess.css"
import App from "./game/src/App";

class ChessBoard extends Component {
    setFen = (fen) => {
        this.child.setFen(fen)
    };

    getFen = () => {
        return this.child.getFen()
    };

    render() {
        return (
            <div className="game-screen">
                <div className="game-container">
                    <App
                        ref={el => this.child = el}
                        onChessMove={this.props.onChessMove}
                    />
                </div>
            </div>
        );
    }
}

export default ChessBoard;

import React, {Component} from 'react';
import "./chess.css"
import App from "./game/src/App";

class ChessBoard extends Component {
    setFen = (fen) => {
        if (!this.child) {
            return;
        }

        this.child.setFen(fen)
    };

    getFen = () => {
        if (!this.child) {
            return "";
        }

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

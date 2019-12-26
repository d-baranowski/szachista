import React, {Component} from 'react';
import ChessBoard from "../chess/ChessBoard";
import PlayerInfo from "../lobby/PlayerInfo";

import "./ChessGame.css"
import GameHistory from "../chess/GameHistory";
import Activities from "../activities/Activities";

class ChessGame extends Component {
    state = {
        history: []
    };

    onChessMove = (history: any) => {
        this.setState({history: [...this.state.history, history]});
    };

    render() {
        return (
            <div>
                <PlayerInfo style={{margin: 5}}/>
                <div className="game-screen-container">
                    <div className="game-history-container">
                        <GameHistory history={this.state.history}/>
                    </div>
                    <div className="chess-board-container">
                        <ChessBoard onChessMove={this.onChessMove}/>
                    </div>
                </div>
                <Activities/>
            </div>
        )
    }
}

export default ChessGame;

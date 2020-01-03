import React, {Component} from 'react';
import ChessBoard from "../chess/ChessBoard";
import PlayerInfo from "../lobby/PlayerInfo";

import "./ChessGame.css"
import GameHistory from "../chess/GameHistory";
import Activities from "../activities/Activities";
import PlayerTimers from "../player-timers/PlayerTimers";

class ChessGame extends Component {
    state = {
        isOpen: false,
        history: []
    };

    onChessMove = (history: any) => {
        this.setState({history: [...this.state.history, history]});
    };

    toggleEvents = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    render() {
        return (
            <div>
                <PlayerInfo style={{margin: 5}}/>
                <PlayerTimers />
                <div className="game-screen-container">
                    <div className="game-history-container">
                        <GameHistory isOpen={this.state.isOpen} history={this.state.history}/>
                    </div>
                    <div className="chess-board-container">
                        <ChessBoard onChessMove={this.onChessMove}/>
                    </div>
                </div>
                <Activities toggleEvents={this.toggleEvents}/>
            </div>
        )
    }
}

export default ChessGame;

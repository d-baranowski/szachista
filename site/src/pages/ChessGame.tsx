import React, {Component} from 'react';
import ChessBoard from "../chess/ChessBoard";
import PlayerInfo from "../lobby/PlayerInfo";

import "./ChessGame.css"
import GameHistory from "../chess/GameHistory";
import Activities from "../activities/Activities";
import PlayerTimers from "../player-timers/PlayerTimers";
import connect from "../state/connect";
import GameStore, {IGameStore} from "../lobby/GameStore";

class ChessGame extends Component<IGameStore> {
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

    chessBoard: ChessBoard | undefined | null;

    componentDidMount(): void {
        if (!this.chessBoard) {
            return;
        }
        console.log(this.props);
        this.chessBoard.setFen(this.props.state.gameState.fen)
    }

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
                        <ChessBoard ref={el => this.chessBoard = el} onChessMove={this.onChessMove}/>
                    </div>
                </div>
                <Activities toggleEvents={this.toggleEvents}/>
            </div>
        )
    }
}

export default connect(GameStore, ChessGame);

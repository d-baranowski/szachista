import React, {Component} from 'react';
import ChessBoard from "../chess/ChessBoard";
import PlayerInfo from "../lobby/PlayerInfo";

import "./ChessGame.css"
import GameHistory from "../chess/GameHistory";
import Activities from "../activities/Activities";
import PlayerTimers from "../player-timers/PlayerTimers";
import connect from "../state/connect";
import GameStore, {IGameStore, ISendChessPieceMoveActionPayload, sendChessPieceMoveAction,} from "../lobby/GameStore";

export interface IChessMove {
    color: "w" | "b"
    from: string
    to: string
    flags: string
    piece: string
    san: string
    pgn: string
}

class ChessGame extends Component<IGameStore> {
    state = {
        isOpen: false,
        history: []
    };

    onChessMove = (move: IChessMove) => {
        if (!this.chessBoard) {
            return;
        }

        const currentFen = this.chessBoard.getFen();
        this.setState({history: [...this.state.history, move]});
        const payload: ISendChessPieceMoveActionPayload = {
            gameId: this.props.state.key,
            move: move,
            suggestedNewState: currentFen
        };

        this.props.dispatch(sendChessPieceMoveAction(payload));
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

    componentDidUpdate(prevProps: Readonly<IGameStore>, prevState: Readonly<{}>, snapshot?: any): void {
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

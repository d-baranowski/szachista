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
    flags: string // "n" | "c" | "b" | "e" | "p" | "k" | "q"
    pgn: string,
    piece: "p" | "n" | "b" | "r" | "q" | "k",
    captured?: "p" | "n" | "b" | "r" | "q" | "k"
    promotion?: "n" | "b" | "r" | "q" | "k"
}

class ChessGame extends Component<IGameStore> {
    state = {
        isOpen: false
    };

    onChessMove = (move: IChessMove) => {
        if (!this.chessBoard) {
            return;
        }

        const currentFen = this.chessBoard.getFen();
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
        const gameStoreState = this.props.state;

        return (
            <div>
                <PlayerInfo
                    playerOnePicture={gameStoreState.playerOnePicture}
                    playerTwoPicture={gameStoreState.playerTwoPicture}
                    playerOneHighlight={gameStoreState.gameState.turn === gameStoreState.playerOneUsername}
                    playerTwoHighlight={gameStoreState.gameState.turn === gameStoreState.playerTwoUsername}
                    style={{margin: 5}}
                />
                <PlayerTimers
                    key={gameStoreState.gameState.turn}
                    playerOneUsername={gameStoreState.playerOneUsername}
                    playerTwoUsername={gameStoreState.playerTwoUsername}
                    timeAllowed={gameStoreState.timeAllowed}
                    timesUsed={gameStoreState.timesUsed}
                    activePlayer={gameStoreState.gameState.turn}
                />
                <div className="game-screen-container">
                    <div className="game-history-container">
                        <GameHistory isOpen={this.state.isOpen} history={gameStoreState.gameHistory}/>
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

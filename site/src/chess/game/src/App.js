import React, {Component} from 'react';
import Board from "./Board";
import Chess from "./chess"
import Style from "./Style";

const chess = new Chess();

class App extends Component {
    state = {
        moves: [],
        board: [],
        lastMove: {}
    };

    setFen = (fen) => {
        chess.load(fen);
        this.setState({
            moves: chess.moves(),
            board: chess.board(),
            lastMove: chess.history({verbose: true}).last()
        });
    };

    makeMove = (move, received = false) => {
        const possibleMoves = chess.moves();

        const includes = possibleMoves.filter(possibleMove => {
            return possibleMove === move
        });

        if (!includes) {
            return;
        }

        // exit if the game is over
        if (chess.game_over() === true ||
            chess.in_draw() === true ||
            possibleMoves.length === 0) return;

        chess.move(move);
        this.setState({
            moves: chess.moves(),
            board: chess.board(),
            lastMove: chess.history({verbose: true}).last()
        });

        window.setTimeout(this.makeMove, 1000);
    };

    updateState = () => {
        this.props.onChessMove({...chess.history({verbose: true}).last(), pgn: chess.pgn()});
        this.setState({
            moves: chess.moves(),
            board: chess.board(),
            lastMove: chess.history({verbose: true}).last()
        });
    };

    componentDidMount() {
        this.updateState();
    }

    render() {
        return (
            <div className="App">
                <Style />
                <div style={{maxWidth: 500}}>
                    <Board
                        getValidMoves={(square) => {
                            return chess.moves({square: square, verbose: true})
                        }}
                        move={(move) => {
                            chess.move(move);
                            this.updateState();
                        }}
                        moves={this.state.moves}
                        board={this.state.board}
                        lastMove={this.state.lastMove}
                    />
                </div>
            </div>
        );
    }
}

export default App;

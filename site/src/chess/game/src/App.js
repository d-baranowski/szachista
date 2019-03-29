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

    makeRandomMove = () => {
        const possibleMoves = chess.moves();

        // exit if the game is over
        if (chess.game_over() === true ||
            chess.in_draw() === true ||
            possibleMoves.length === 0) return;

        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        chess.move(possibleMoves[randomIndex]);
        this.setState({
            moves: chess.moves(),
            board: chess.board(),
            lastMove: chess.history({ verbose: true }).last()
        });

        window.setTimeout(this.makeRandomMove, 1000);
    };

    updateState = () => {
        this.setState({
            moves: chess.moves(),
            board: chess.board(),
            lastMove: chess.history({ verbose: true }).last()
        });
    };

    componentDidMount() {
        chess.load_pgn("1. g4 g5 2. f4 gxf4 3. g5 Nh6 4. g6 f5 5. g7 e6 6. e4 fxe4 7. h4 f3");

        this.updateState();
        //this.makeRandomMove();
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

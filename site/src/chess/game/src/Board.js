import React, {Component} from 'react';
import debounce from "./debounce";
import BoardSquare from "./BoardSquare";
import PromotionModal from "./PromotionModal";
import AnimatedFigure from "./AnimatedFigure";

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const getElementDifference = (from, to) => {
    if (!from || !to) {
        return {x: 0, y: 0};
    }

    const fromRec = from.getBoundingClientRect();
    const toRec = to.getBoundingClientRect();

    return {x: fromRec.x - toRec.x, y: fromRec.y - toRec.y}
};

class Board extends Component {
    state = {
        width: undefined,
        from: undefined,
        promotionModal: undefined
    };

    setSizeHandler = debounce(() => {
        this.setState({
            width: this.domElement.offsetWidth
        });
    }, 20);

    componentDidMount() {
        this.setState({
            width: this.domElement.offsetWidth
        });
        window.addEventListener('resize', this.setSizeHandler, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setSizeHandler, false);
    }

    getPromotionDecision = (movesToSquare) => {
        return new Promise((resolve) => {
            this.setState({
                promotionModal: {
                    color: movesToSquare[0].color === "w" ? "white" : "black",
                    onSelection: (selection) => resolve(selection)
                }
            })
        })
    };

    onSquareClick = async (square) => {
        if (this.state.from && this.state.from !== square) {
            const movesToSquare = this.props.getValidMoves(this.state.from).filter((el) => el.to === square);
            if (movesToSquare) {
                if (movesToSquare.length === 1) {
                    this.props.move(movesToSquare[0]);
                    this.setState({
                        from: undefined
                    })
                } else if (movesToSquare.length === 0) {
                    this.setState({
                        from: square
                    });
                } else if (movesToSquare.length > 1) {
                    const selection = await this.getPromotionDecision(movesToSquare);
                    this.props.move(movesToSquare.find(el => el.promotion === selection));
                    this.setState({
                        from: undefined,
                        promotionModal: undefined
                    });
                }
            } else {
                this.setState({
                    from: square
                });
            }
        } else if (this.state.from === square) {
            this.setState({
                from: undefined
            })
        } else {
            this.setState({
                from: square
            })
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.state.promotionModal && <PromotionModal
                    onSelection={this.state.promotionModal.onSelection}
                    color={this.state.promotionModal.color}/>}
                <div className="board-container" ref={ref => {
                    this.domElement = ref
                }}>
                    {this.props.board && Array(8).fill(1).map((__, i) =>
                        <div key={`board-row-${i}`} className="row">
                            {this.props.board[i] && Array(8).fill(1).map((_, j) => {
                                let animateFrom = {x: 0, y: 0};
                                const letter = letters[j];
                                const number = 8 - i;

                                if (this.props.lastMove && this.props.lastMove.to === `${letter}${number}`) {
                                    const from = document.getElementsByClassName(this.props.lastMove.from)[0];
                                    const to = document.getElementsByClassName(this.props.lastMove.to)[0];

                                    animateFrom = getElementDifference(from, to);
                                }

                                const validMoves = this.state.from ? this.props.getValidMoves(this.state.from) : [];
                                const isValidMove = !!validMoves.find((elem) => elem.to === `${letter}${number}`);
                                const name = letter + number;

                                let highlight = false;

                                if (isValidMove) {
                                    highlight = true
                                }

                                if (validMoves.length === 0 && this.props.lastMove.from === name) {
                                    highlight = true
                                }

                                if (validMoves.length === 0 && this.props.lastMove.to === name) {
                                    highlight = true
                                }

                                return (
                                    <BoardSquare
                                        key={`board-square-${name}`}
                                        highlight={highlight}
                                        name={name}
                                        onClick={this.onSquareClick}
                                        width={this.state.width / 8}
                                    >
                                        {this.props.board[i][j] &&
                                        <AnimatedFigure animateFrom={animateFrom} figure={this.props.board[i][j]}/>}
                                    </BoardSquare>
                                )
                            })
                            }

                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

Board.defaultProps = {
    lastMove: {}
};

Board.propTypes = {};

export default Board;

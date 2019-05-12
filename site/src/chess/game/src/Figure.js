import React, {Component} from 'react';
import figures from "./figury"

const figuresMap = {
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king",
    p: "pawn"
};

const colorMap = {
    b: "black",
    w: "white"
};

const duration = 300;

// Animation algorithm
// -------------------
// Given that the chess piece dimensions are equal to to the board square dimensions
// - Note the origin square os (square which the movement begun).
// - Calculate the difference of position between the origin square and the destination square delta.
// - Render the element within the destination square and set its position to relative. Set css position to
// delta.
// - After a timeout set its position to 0. If css transitions are enabled animation will occur.

class Figure extends Component {
    state = {
        showPreviousPosition: true
    };

    componentDidMount() {
        this.setState({
            showPreviousPosition: true
        });
        setTimeout(() => {
            this.setState({
                showPreviousPosition: false
            })
        }, 50)
    }

    render() {
        const {figure, animateFrom} = this.props;

        if (!figure) {
            return null;
        }

        const transitionStyles = {
            position: 'relative',
            transition: `all ${duration}ms ease-in-out`,
            top: this.state.showPreviousPosition ? animateFrom.y : 0,
            left: this.state.showPreviousPosition ? animateFrom.x : 0,
            padding: 2
        };

        const Type = figures[figuresMap[figure.type]];
        const color = colorMap[figure.color];

        return (
            <div style={{
                ...transitionStyles
            }} className={"figure figure-" + color}>
                <Type color={color}/>
            </div>
        )
    }
}

Figure.propTypes = {};

export default Figure;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import pieces from "./figury";


// queen, knight, rook, or bishop
const Queen = pieces.queen;
const Knight = pieces.knight;
const Rook = pieces.rook;
const Bishop = pieces.bishop;

class PromotionModal extends Component {
    state = {
        transitionTrigger: true
    };

    componentDidMount() {
        this.setState({
            transitionTrigger: true
        });
        setTimeout(() => {
            this.setState({
                transitionTrigger: false
            })
        }, 350)
    }

    render() {
        const { color, onSelection } = this.props;
        return (
            <div className={"floating-modal " + (!this.state.transitionTrigger ? " " : "moveOff")}>
                <div onClick={() => { onSelection("q") }} className={"figure figure-" + color}>
                    <Queen />
                </div>
                <div onClick={() => { onSelection("n") }} className={"figure figure-" + color}>
                    <Knight />
                </div>
                <div onClick={() => { onSelection("r") }} className={"figure figure-" + color}>
                    <Rook />
                </div>
                <div onClick={() => { onSelection("b") }} className={"figure figure-" + color}>
                    <Bishop />
                </div>
            </div>
        );
    }
}

PromotionModal.propTypes = {};

export default PromotionModal;
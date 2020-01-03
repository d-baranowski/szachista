import React, {Component} from 'react';
import "./TokensMenu.css"
import {ArrowDown, ArrowUp, Check, Close, Tokens} from "../icons";

class TokensMenu extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    };

    render() {
        return (
            <>
                <div onClick={this.toggle}><Tokens/></div>
                <div className={`tokens-menu ${this.state.isOpen ? '' : 'closed'}`}>
                    <div className="tokens-menu-container">
                        <div className="move-left"><Close/></div>
                        <ArrowDown/>
                        <div className="tokens-value">$200</div>
                        <ArrowUp/>
                        <div className="move-right"><Check/></div>
                    </div>
                </div>
            </>
        );
    }
}


export default TokensMenu;

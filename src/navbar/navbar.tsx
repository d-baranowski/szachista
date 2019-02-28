import React, {Component} from 'react';
import './navbar.css';
import { Home } from "../icons";
import logo from './logo.svg';
import Hamburger from "./hamburger/Hamburger";

class Navbar extends Component {
    state = {
        open: false
    };

    toggle = () => {
        this.setState({open: !this.state.open});
    };


    render() {
        const { open } = this.state;

        return (
            <div className="nav">
                <div className="nav-content nav-show">
                    <div className="nav-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div onClick={this.toggle} className="nav-btn">
                        <Hamburger open={this.state.open} />
                    </div>
                    <div className={"nav-links " + (open ? "open" : "")  }>
                        <a href="/" target="_blank"><Home /></a>
                        <a href="/" target="_blank">Leaderboard</a>
                        <a href="/" target="_blank">Community</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
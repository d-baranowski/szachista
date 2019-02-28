import React, {Component} from 'react';
import './navbar.css';
import { Home } from "../icons";
import logo from './logo.svg';
import Hamburger from "./hamburger/Hamburger";
import {Link} from "react-router-dom";

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
                        <Link to="/"><Home /></Link>
                        <Link to="/leaderboard">Leaderboard</Link>
                        <Link to="/community">Community</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
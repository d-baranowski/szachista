import * as React from 'react'
import {Component} from 'react'
import Link from 'next/link'
import {Home, Person} from "../icons";
import Hamburger from "./hamburger/Hamburger";
import ProfileLink from "../auth/ProfileLink";

class Navbar extends Component {
    state = {
        open: false
    };

    toggle = () => {
        this.setState({open: !this.state.open});
    };


    render() {
        const {open} = this.state;

        return (
            <>
                <style jsx>
                    {`
                    @keyframes App-logo-spin {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }

                    nav * {
                        box-sizing: border-box;
                    }

                   .nav .nav-btn {
                        height: 100%;
                        align-items: center;
                    }

                    .nav-btn svg {
                        width: 50px;
                        height: 50px;
                    }

                    .nav {
                        height: 100px;

                        font-size: calc(10px + 2vmin);
                        color: white;
                        background: linear-gradient(#09090D, #0D1017);

                        width: 100%;
                        position: relative;
                    }

                    .nav-header {
                        width: 100px;
                    }

                    .nav-header img {
                        width: 100%;
                        height: 100%;
                        animation: App-logo-spin infinite 20s linear;
                    }

                    .nav-links {
                        display: flex;
                        width: calc(100% - 200px);
                        font-size: 14px;
                        font-weight: 900;
                        justify-content: center;
                        z-index: 1;
                    }

                    .nav-links > a {
                        display: inline-block;
                        text-decoration: none;
                        color: #efefef;
                        line-height: 24px;
                        height: 24px;
                        padding: 2vw;
                        border-width: 0px;
                    }

                    #nav-check {
                        display: none;
                    }

                    .nav-content {
                        height: 100%;
                        display: flex;
                    }

                    .nav-btn {
                        display: none;
                    }

                    .right-container {
                        display: inline-flex;
                        align-items: center;
                    }


                    @media (min-width: 620px) {
                        .nav-links {
                            height: 100%;
                            display: inline-flex;
                            align-items: center;
                        }

                        .nav-header {
                            height: 100%;
                            display: inline-flex;
                            align-items: center;
                        }

                        .nav-content {
                            margin-left: 10%;
                            margin-right: 10%;
                        }

                        .nav-links > a:hover {
                            border-bottom: 1px solid #38EBAE;
                            margin-bottom: -1px;
                        }

                    }

                    @media (max-width: 620px) {
                        .nav {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .nav-btn {
                            display: flex;
                            position: absolute;
                            left: 12px;
                            top: 0;
                        }

                        .nav-links {
                            position: absolute;
                            display: block;
                            width: 50%;
                            background-color: rgba(51, 51, 51, 0.97);
                            height: 0;
                            overflow-y: hidden;
                            top: 100px;
                            left: -50%;
                            transition: left 150ms ease-in-out;
                        }

                        .nav-links.open {
                            left: 0;
                        }

                        .nav-links > a {
                            text-align: center;
                            display: block;
                            width: 100%;
                            padding: 10px 0 10px 0;
                        }

                        .nav-links {
                            height: 0;
                        }

                        .nav-show .nav-links {
                            height: calc(100vh - 50px);
                            overflow-y: auto;
                        }

                        .right-container {
                            display: flex;
                            position: absolute;
                            right: 12px;
                            height: 100%;
                        }
                    }
                `}
                </style>
                <div className="nav">
                    <div className="nav-content nav-show">
                        <div className="nav-header">
                            <img src="/logo.svg" className="App-logo" alt="logo"/>
                        </div>
                        <div onClick={this.toggle} className="nav-btn">
                            <Hamburger open={this.state.open}/>
                        </div>
                        <div className={"nav-links " + (open ? "open" : "")}>
                            <Link passHref href="/"><a><Home/></a></Link>
                            <Link passHref href="/leaderboard"><a>Leaderboard</a></Link>
                            <Link passHref href="/community"><a>Community</a></Link>
                        </div>
                        <div className="right-container">
                            <ProfileLink/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Navbar;

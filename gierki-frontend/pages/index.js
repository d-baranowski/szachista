import React from 'react'
import Head from 'next/head'
import Nav from '../components/navbar/navbar'
import GameTile from "../components/games/GameTile";

const Home = () => (
    <div>
        <Head>
            <title>Home</title>
            <link rel="icon" href="/favicon.ico"/>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                }

                body {
                    background-color: #131825;
                    margin: 0;
                    padding: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                    sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                code {
                    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
                    monospace;
                }

                .App-link {
                    color: #61dafb;
                }

                .page-body {
                    margin-top: 30px;
                }

                @media (min-width: 620px) {
                    .page-body {
                        margin-left: 10%;
                        margin-right: 10%;
                    }
                }

                body * {
                    user-select: none;
                }

                #root {
                    height: 100%;
                    position: absolute;
                    width: 100%;
                }

                .game-tiles {
                    display: flex;
                    justify-content: center;
                    margin-top: 30px;
                }

                .App {
                    height: 100%;
                }
            `}</style>
        </Head>

        <Nav/>

        <div className="game-tiles">
            <GameTile to="/chess" src="/chess.jpg"/>
        </div>
    </div>
)

export default Home

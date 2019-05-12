import React from 'react';
import GameTile from "./GameTile";
import "./GameTiles.css"

const GamesList = () => (
    <div className="game-tiles">
        <GameTile to="/chess" src="/chess.jpg"/>
    </div>
);

GamesList.propTypes = {};

export default GamesList;
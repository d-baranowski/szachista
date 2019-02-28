import React from 'react';
import "./GameTile.css";
import {Link} from "react-router-dom";

interface Props {
    src: string,
    to: string
}

const GameTile: React.FunctionComponent<Props> = ({src, to}) => (
    <Link to={to}>
        <div className="game-tile">
            <div className="game-tile-image-frame">
                <img alt="" src={src} />
            </div>
            <div className="game-tile-content">
                <div>Chess</div>
            </div>
        </div>
    </Link>
);

GameTile.propTypes = {};

export default GameTile;
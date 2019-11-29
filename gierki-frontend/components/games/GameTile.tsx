import * as React from 'react'
import Link from 'next/link'

interface Props {
    src: string,
    to: string
}

const GameTile: React.FunctionComponent<Props> = ({src, to}) => (
    <>
        <style jsx>
            {`
            .game-tile {
                border: 1px solid #333A44;
                background-color: #494e55;
                padding: 15px;
                width: 320px;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 400ms ease-in-out;
            }

            .game-tile-image-frame {
                overflow: hidden;
                width: 100%;
                max-width: 100%;
            }

            .game-tile img {
                width: 100%;
                max-width: 100%;
                border-radius: 3px;
                transition: transform 0.3s ease-in-out;
            }

            .game-tile:hover img {
                transform: scale(1.05);
            }

            .game-tile:hover {
                background-color: #2db083;
            }

            .game-tile-content {
                color: white;
                font-weight: 700;
                padding-top: 15px;
                padding-bottom: 5px;
                transition: color 200ms ease-in-out;
            }

           .game-tile:hover .game-tile-content {
               color: #090D12;
           }

           a {
               text-decoration: none;
           }
        `}
        </style>
        <Link href={to}>
            <div className="game-tile">
                <div className="game-tile-image-frame">
                    <img alt="" src={src}/>
                </div>
                <div className="game-tile-content">
                    <div>Chess</div>
                </div>
            </div>
        </Link>
    </>
);

GameTile.propTypes = {};

export default GameTile;

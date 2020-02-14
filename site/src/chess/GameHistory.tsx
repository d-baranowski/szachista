import React from 'react';
import Figure from "./game/src/Figure";
import "./GameHistory.css";

const FLAG_NORMAL = 'n';
const FLAG_CAPTURE = 'c';
const FLAG_BIG_PAWN = 'b';
const FLAG_EP_CAPTURE = 'e';
const FLAG_PROMOTION = 'p';
const FLAG_KSIDE_CASTLE = 'k';
const FLAG_QSIDE_CASTLE = 'q';

const PAWN = 'p';
const KNIGHT = 'n';
const BISHOP = 'b';
const ROOK = 'r';
const QUEEN = 'q';
const KING = 'k';


interface HistoryEntry {
    color: "w" | "b"
    from: string
    to: string
    flags: string // "n" | "c" | "b" | "e" | "p" | "k" | "q"
    pgn: string,
    piece: "p" | "n" | "b" | "r" | "q" | "k",
    captured?: "p" | "n" | "b" | "r" | "q" | "k"
    promotion?: "n" | "b" | "r" | "q" | "k"
}

interface Props {
    isOpen: boolean
    history: Array<HistoryEntry>
}

const rowStyle = {
    display: "flex",
    padding: 5
};

const lineStyle = {
    lineHeight: "25px"
};

const figureStyle = {height: 25, width: 25, marginRight: 2};

function GameHistory(props: Props) {
    console.log(props.history)

    return (
        <div className={`game-history ${props.isOpen ? "open" : ""}`}>
            {
                props.history.map((elem) => {
                    return (
                        <div key={elem.pgn} style={rowStyle}>
                            <div style={figureStyle}>
                                <Figure crossOut={false} style={{}} figure={{color: elem.color, type: elem.piece}}/>
                            </div>
                            <div style={lineStyle}>{elem.from} </div>
                            <div style={{...lineStyle, marginLeft: 2, marginRight: 4}}>&rarr;</div>
                            <div style={lineStyle}>{elem.to}</div>
                            {elem.flags && elem.flags.includes(FLAG_CAPTURE) &&
                            <div style={figureStyle}>
                                <Figure crossOut style={{}}
                                        figure={{color: elem.color == "w" ? "b" : "w", type: elem.captured}}/>
                            </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default GameHistory;

import React from 'react';
import figures from "./figury"

const figuresMap = {
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king",
    p: "pawn"
};

const colorMap = {
    b: "black",
    w: "white"
};

const Figure = ({figure, style, crossOut}) => {
    if (!figure) {
        return null;
    }

    const Type = figures[figuresMap[figure.type]];
    const color = colorMap[figure.color];

    return (
        <div style={style} className={"figure figure-" + color}>
            <Type crossOut={crossOut}/>
        </div>
    )
};


export default Figure;

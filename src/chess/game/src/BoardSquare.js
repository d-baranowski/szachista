import React from 'react';

const BoardSquare = (props) => (
    <div onClick={() => props.onClick(`${props.letter}${props.number}`)} style={{width: props.width ? props.width : 0, height: props.width ? props.width : 0}}
         className={`board-element ${props.letter}${props.number} ${props.validMove ? "highlight" : ""}`}>
        {props.children}
    </div>
);

export default BoardSquare;
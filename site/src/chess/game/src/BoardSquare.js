import React from 'react';

const BoardSquare = (props) => {
    return (
        <div onClick={() => props.onClick(props.name)}
             style={{width: props.width ? props.width : 0, height: props.width ? props.width : 0}}
             className={`board-element ${props.name} ${props.highlight ? "highlight" : ""}`}>
            {props.children}
        </div>
    )
};

export default BoardSquare;

import React from 'react';
import {chessGame as ChessGame} from "./ChessGame";
import testData from "./GameStore.testdata";

export default {
    title: 'Chess Game',
    component: TestContainer,
};

export const TestContainer = () => {
    return <ChessGame
        {...testData}
    />
};

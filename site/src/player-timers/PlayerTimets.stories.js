import React from 'react';
import PlayerTimers from "./PlayerTimers";

const TestContainer = () => {
   return <PlayerTimers
       timesUsed={{
           playerOne: 1000,
           playerTwo: 3000
       }}
       playerOneUsername="playerOne"
       playerTwoUsername="playerTwo"
       activePlayer="playerTwo"
       timeAllowed={30000}
   />
};

export default {
  title: 'Player Times',
  component: TestContainer,
};

export const PlayerTimer = TestContainer;

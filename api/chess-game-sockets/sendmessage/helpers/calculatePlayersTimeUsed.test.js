const underTest = require("./calculatePlayersTimeUsed");
const testData = require("../test/chess-game");

(function test() {
    console.log(underTest(testData.gameState.log));
})();

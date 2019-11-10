const assert = require('assert');
const lib = require("../../index");
const sample_item = require('./sample-chess-lobby-item');
const sample_connection = require('./sample-chess-lobby-connection-item');

(async () => {
    const shouldBeEmpty = await lib.data.chess_lobby.getActiveGames(1572989876600);
    assert.equal(shouldBeEmpty.Count, 0);
lib.data.simplechat_connections.saveItem()
    await lib.data.chess_lobby.createItem(sample_item);

    const createdItem = await lib.data.chess_lobby.getChessGame('85f78ac0-0014-11ea-9ba5-f3a5f691e1e3');
    const listWithSingleElement = await lib.data.chess_lobby.getActiveGames(1572989876600);

    assert.equal(listWithSingleElement.Count, 1);

    await lib.data.chess_lobby.saveChessConnection(createdItem.Items[0], sample_connection);
    await lib.data.chess_lobby.saveChessConnection(createdItem.Items[0], sample_connection);
    const createdItemWithConnection = await lib.data.chess_lobby.getChessGame('85f78ac0-0014-11ea-9ba5-f3a5f691e1e3');
    assert(createdItemWithConnection.Items[0].playerConnections[0].connectionId, "CtHDzdSqDoECJrw=");
    assert(createdItemWithConnection.Items[0].playerConnections[1].connectionId, "CtHDzdSqDoECJrw=");

    const listWithZeroElements = await lib.data.chess_lobby.getActiveGames(1572989877600);
    assert.equal(listWithZeroElements.Count, 0);

    await lib.data.chess_lobby.deleteItem('85f78ac0-0014-11ea-9ba5-f3a5f691e1e3', createdItem.Items[0].createdTime);

    const shouldBeEmpty2 = await lib.data.chess_lobby.getActiveGames(1572989876600);
    assert.equal(shouldBeEmpty2.Count, 0);

})();

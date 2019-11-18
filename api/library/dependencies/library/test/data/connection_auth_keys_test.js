const assert = require('assert');
const lib = require("../../index");
const sample_access_key_item = require('./sample-access-key-item');


(async () => {
    await lib.data.connection_auth_keys.deleteConnectionAuthKey("Google_109354484677663308178", "chess-lobby");
    const shouldBeMissing = await lib.data.connection_auth_keys.getConnectionAuth("Google_109354484677663308178", "chess-lobby");
    console.log(shouldBeMissing);
    assert.equal(JSON.stringify(shouldBeMissing), "{}");

    await lib.data.connection_auth_keys.saveItem(sample_access_key_item);

    const shouldContainData = await lib.data.connection_auth_keys.getConnectionAuth("Google_109354484677663308178", "chess-lobby");
    assert.equal(JSON.stringify(shouldContainData.Item.accessKeys), JSON.stringify(sample_access_key_item.accessKeys));
    assert.equal(shouldContainData.Item.authContext, sample_access_key_item.authContext);
    assert.equal(shouldContainData.Item.key, sample_access_key_item.key);
    assert.equal(shouldContainData.Item.authentity, sample_access_key_item.authentity);
    await lib.data.connection_auth_keys.deleteConnectionAuthKey("Google_109354484677663308178", "chess-lobby");
})();

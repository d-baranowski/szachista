const assert = require('assert');
const lib = require("../../index");
const sample_access_key_item = require('./sample-access-key-item');


(async () => {
    await lib.data.connection_auth_keys.deleteConnectionAuthKey("Google_109354484677663308178");
    const shouldBeMissing = await lib.data.connection_auth_keys.getConnectionAuthByUserId("Google_109354484677663308178");
    lib.log(shouldBeMissing);
    assert.equal(JSON.stringify(shouldBeMissing), "{}");

    await lib.data.connection_auth_keys.saveItem(sample_access_key_item);

    const shouldContainData = await lib.data.connection_auth_keys.getConnectionAuthByUserId("Google_109354484677663308178")

    assert.equal(shouldContainData.Item.accessKey, sample_access_key_item.accessKey);
    assert.equal(shouldContainData.Item.authContext, sample_access_key_item.authContext);
    assert.equal(shouldContainData.Item.key, sample_access_key_item.key);
    assert.equal(shouldContainData.Item.authentity, sample_access_key_item.authentity);
})();

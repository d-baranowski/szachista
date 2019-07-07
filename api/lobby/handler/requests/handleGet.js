const databaseManager = require("../database-manager");
const uuidv1 = require("uuid/v1");
const sendResponse = require("../sendResponse");

/**
 *
 * {
    "Items": [
        {
            "gameName": "How many games are there",
            "password": "NOTREQUIRED",
            "viewers": [],
            "players": {
                "two": {},
                "one": "Google_109354484677663308178"
            },
            "lastActivity": 1562449088409,
            "lastActivityDay": "2019-07-06",
            "timeAllowed": 323231,
            "tokensToEnter": 60,
            "createdTime": 1562449088409,
            "key": "58728890-a036-11e9-be90-912e8ad79862"
        },
        {
            "gameName": "How many games are there",
            "password": "NOTREQUIRED",
            "viewers": [],
            "players": {
                "two": {},
                "one": "Google_109354484677663308178"
            },
            "lastActivity": 1562449089245,
            "lastActivityDay": "2019-07-06",
            "timeAllowed": 323231,
            "tokensToEnter": 60,
            "createdTime": 1562449089245,
            "key": "58f218d0-a036-11e9-be90-912e8ad79862"
        },
        {
            "gameName": "How many games are there",
            "password": "NOTREQUIRED",
            "viewers": [],
            "players": {
                "two": {},
                "one": "Google_109354484677663308178"
            },
            "lastActivity": 1562449089903,
            "lastActivityDay": "2019-07-06",
            "timeAllowed": 323231,
            "tokensToEnter": 60,
            "createdTime": 1562449089903,
            "key": "59567ff0-a036-11e9-be90-912e8ad79862"
        },
        {
            "gameName": "How many games are there",
            "password": "NOTREQUIRED",
            "viewers": [],
            "players": {
                "two": {},
                "one": "Google_109354484677663308178"
            },
            "lastActivity": 1562449102495,
            "lastActivityDay": "2019-07-06",
            "timeAllowed": 323231,
            "tokensToEnter": 60,
            "createdTime": 1562449102495,
            "key": "60d7e2f0-a036-11e9-be90-912e8ad79862"
        },
        {
            "gameName": "How many games are there",
            "password": "NOTREQUIRED",
            "viewers": [],
            "players": {
                "two": {},
                "one": "Google_109354484677663308178"
            },
            "lastActivity": 1562449103986,
            "lastActivityDay": "2019-07-06",
            "timeAllowed": 323231,
            "tokensToEnter": 60,
            "createdTime": 1562449103986,
            "key": "61bb6520-a036-11e9-be90-912e8ad79862"
        },
        {
            "gameName": "How many games are there",
            "password": "qwqwqrweqwreqwqewrqfqdfqwe",
            "viewers": [],
            "players": {
                "two": {},
                "one": "Google_109354484677663308178"
            },
            "lastActivity": 1562449247676,
            "lastActivityDay": "2019-07-06",
            "timeAllowed": 323231,
            "tokensToEnter": 60,
            "createdTime": 1562449247676,
            "key": "b760bfc0-a036-11e9-be90-912e8ad79862"
        }
    ],
    "Count": 6,
    "ScannedCount": 6
}
 *
 *
 */

const getActiveGames = (event, context, callback/*, accessData */) => {
    const acceptedThreshold = Date.now() - 1000 * 60 * 5;

    databaseManager.getActiveGames(acceptedThreshold)
        .then((items) => {

            const mapped = items.Items.map((item) => {
                return {
                    ...item,
                    password: item.password === "NOTREQUIRED" ? "NOTREQUIRED" : "REQUIRED"
                }
            });

            sendResponse(200, mapped, callback)
        })
        .catch(err => {
            console.log(err);
            sendResponse(500, "Unexpected error", callback)
        });
};

module.exports = handlePost = (event, context, callback, accessData) => {
    if (event.resource === "/") {
        getActiveGames(event, context, callback, accessData);
    } else {
        sendResponse(404, `Unsupported path "${event.path}"`, callback);
    }
};
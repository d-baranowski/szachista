import webSocketsAuthKeyFetch from "../../auth/WebSocketsAuthKeyFetch";
import ErrorHandler from "../../error/ErrorHandler";
import User, {EMPTY_USER_INFO} from "../../auth/User";

export const getParams = async () => {
    const chatId = "chess-lobby";

    let Authorizer: string;

    try {
        Authorizer = await webSocketsAuthKeyFetch({authContext: chatId});
    } catch (e) {
        ErrorHandler.handle(e);
        return null;
    }

    if (!Authorizer) {
        return null;
    }

    let UserId;

    try {
        const userInfo = User.getUserInfo();
        UserId = userInfo !== EMPTY_USER_INFO ? userInfo["cognito:username"] : null;
    } catch (e) {
        ErrorHandler.handle(e);
        return null;
    }

    if (!UserId) {
        return null;
    }

    return `?Authorizer=${Authorizer}&UserId=${UserId}&chatId=${chatId}`
};

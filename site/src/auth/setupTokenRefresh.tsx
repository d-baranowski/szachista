import TokenFetcher from "./TokenFetcher";
import saveSecret from "./saveSecret";
import secureSecret from "./secureSecret";
import ErrorHandler from "../error/ErrorHandler";

export default (() => {
    let interval: NodeJS.Timeout | null = null;
    return () => {
        if (interval) {
            return
        }

        interval = setInterval(() => {
            let failCount = 0;

            TokenFetcher.refreshToken().then(value => {
                failCount = 0;
                saveSecret(secureSecret(value))
            }).catch((error) => {
                ErrorHandler.handle(error);
                failCount++;

                if (failCount == 3) {
                    window.sessionStorage.removeItem(process.env.REACT_APP_TOKEN_SESSION_STORE_KEY as string);
                    clearInterval(interval as NodeJS.Timeout);
                    interval = null;
                }
            });

        }, 10 * 60 * 1000)
    }

})()
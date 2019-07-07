import TokenFetcher from "./TokenFetcher";
import saveSecret from "./saveSecret";
import secureSecret from "./secureSecret";
import ErrorHandler from "../error/ErrorHandler";

// Refresh once and then check every 10 minutes
export default (() => {
    if (window.sessionStorage.getItem(process.env.REACT_APP_TOKEN_SESSION_STORE_KEY as string)) {
        TokenFetcher.refreshToken().then(value => {
            saveSecret(secureSecret(value))
        }).catch(() => {
            window.sessionStorage.removeItem(process.env.REACT_APP_TOKEN_SESSION_STORE_KEY as string);
        });
    }

    let interval: NodeJS.Timeout | null = null;
    return () => {
        if (interval) {
            return
        }

        interval = setInterval(() => {
            if (!window.sessionStorage.getItem(process.env.REACT_APP_TOKEN_SESSION_STORE_KEY as string)) {
                return;
            }

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

        }, 60 * 1000)
    }
})()
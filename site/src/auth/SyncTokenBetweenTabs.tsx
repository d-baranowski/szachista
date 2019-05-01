let syncTokensBetweenBats: () => void = () => {
    if (!sessionStorage.length) {
        // Ask other tabs for session storage
        localStorage.setItem('getSessionStorage', `${Date.now()}`);
    }

    window.addEventListener('storage', function (event) {
        if (event.key == 'getSessionStorage') {
            // Some tab asked for the sessionStorage -> send it

            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            localStorage.removeItem('sessionStorage');

        } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
            // sessionStorage is empty -> fill it
            const value = event.newValue as string;
            const key = process.env.REACT_APP_TOKEN_SESSION_STORE_KEY as string;
            const data = JSON.parse(value);
            sessionStorage.setItem(key, data[key]);
        }
    });

    window.onbeforeunload = function () {
        sessionStorage.clear();
    };
}

export default syncTokensBetweenBats;
interface IErrorHandler {
    handle: (error: any) => Promise<any>
}

class ErrorHandler implements IErrorHandler {
    handle(error: any) {
        return new Promise((accept) => {
            console.log(error);
            accept();
        });
    }
}

export default new ErrorHandler();
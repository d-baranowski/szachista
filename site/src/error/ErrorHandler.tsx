interface IErrorHandler {
    handle: (error: any) => Promise<any>
}

class ErrorHandler implements IErrorHandler {
    handle(error: any) {
        console.log(error);

        return Promise.resolve();
    }
}

export default new ErrorHandler();
export class DatabaseConnectionError extends Error {
    reason = 'Error connecting to database';

    constructor() {
        super();

        // Only because we are extending a built in class
        (<any>Object).setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
}


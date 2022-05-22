export class DatabaseConnectionError extends Error {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super('Error connecting to db');

        // Only because we are extending a built in class
        (<any>Object).setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
}


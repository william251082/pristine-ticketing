import express, { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError } from '../middlewares/database-connection-error';
import { RequestValidationError } from '../middlewares/request-validation-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof RequestValidationError) {
        console.log('RequestValidationError')
    }
    if (err instanceof DatabaseConnectionError) {
        console.log('DatabaseConnectionError')
    }
    res.status(400).send({
        message: err.message
    })
}

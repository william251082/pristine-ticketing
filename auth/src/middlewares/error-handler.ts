import express, { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError } from '../middlewares/database-connection-error';
import { RequestValidationError } from '../middlewares/request-validation-error';
import { CustomError } from './custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }
    res.status(400).send({
        message: err.message
    })
}

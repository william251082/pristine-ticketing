import express, { Request, Response } from 'express';
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validate-request";

const router = express.Router();

router.post(
    '/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    (req: Request, res: Response) => {

    }
);

export { router as signinRouter }

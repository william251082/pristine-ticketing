import express, { Request, Response } from 'express';
import {body, validationResult} from "express-validator";
import { DatabaseConnectionError } from '../middlewares/database-connection-error';
import { RequestValidationError } from '../middlewares/request-validation-error';
import { User } from '../model/user';
// import jwt from 'jsonwebtoken';
//
// import {User} from "../model/user";
// import {BadRequestError} from "@iceshoptickets/common";
// import {validateRequest} from "@iceshoptickets/common";
//
// const router = express.Router();
//
// router.post(
//     '/api/users/signup', [
//     body('email')
//         .isEmail()
//         .withMessage('Email must be valid'),
//     body('password')
//         .trim()
//         .isLength({ min: 4, max: 20 })
//         .withMessage('Password must be between 4 and 20 characters')
//     ],
//     validateRequest,
//     async (req: Request, res: Response) => {
//         const { email, password } = req.body;
//
//         const existingUser = await User.findOne({ email });
//
//         if (existingUser) {
//             throw new BadRequestError('Email in use');
//         }
//
//         const user = User.build({ email, password });
//         await user.save();
//
//
//         // Generate jwt
//         const userJwt = jwt.sign({
//             id: user.id,
//             email: user.email
//         }, process.env.JWT_KEY!);
//
//         // Store it on session object
//         req.session = {
//             jwt: userJwt
//         };
//
//         res.status(201).send(user)
// });

const router = express.Router();

const reqBody = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
]

router.post('/api/users/signup', reqBody, async (req: Request, res: Response ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        console.log('Email in use')
        return res.send({})
    }
    console.log('Creating a user...')
    const user = User.build({ email, password })
    await user.save()
    res.status(201).send(user)
    throw new DatabaseConnectionError()
    res.send({})
});

export { router as signupRouter }

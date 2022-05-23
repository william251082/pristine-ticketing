import express, { Request, Response } from 'express';
import {body, validationResult} from "express-validator";
import {User} from "../model/user";
import {Password} from "../services/password";
import jwt from 'jsonwebtoken';
import {validateRequest, BadRequestError, RequestValidationError} from "@pristinetickets/common";

const router = express.Router()

const reqBody = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
]

router.post('/api/users/signin', reqBody, validateRequest, async (req: Request, res: Response ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
        existingUser.password,
        password
    );
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials');
    }

    // Generate jwt
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);
    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser)
})

export { router as signinRouter }

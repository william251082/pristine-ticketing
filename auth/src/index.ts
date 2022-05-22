import mongoose from "mongoose";
import { json } from 'body-parser';
import 'express-async-errors'
import cookieSession from 'cookie-session';

import express, {Request, Response} from 'express';
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { NextFunction } from "express";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";


const start = async () => {
    console.log('Starting up...')
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

  try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to Mongodb');
  } catch (err) {
      console.error(err)
  }
};
const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)
app.get('*', async (req: Request, res: Response, next: NextFunction) => {
    throw new NotFoundError()
})
app.use(errorHandler)
start();
app.listen(3000, () => {
    console.log('Listening on port 3000, auth')
});




import express, {Request, Response} from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import mongoose from "mongoose";
import cookieSession from 'cookie-session';

import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signupRouter} from "./routes/signup";
import {signoutRouter} from './routes/signout';
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
// make sure tht express is aware that it's behind a proxy of ingress-nginx and still trust it
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    }));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
      await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
      console.log('Connected to Mongodb');
  } catch (err) {
      console.error(err)
  }
};

app.listen(3000, () => {
    console.log('Listening on port 3000, auth')
});

start();
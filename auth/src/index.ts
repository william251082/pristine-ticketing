import mongoose from "mongoose";
import { json } from 'body-parser';

import express, {Request, Response} from 'express';
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";


const start = async () => {
    console.log('Starting up...')
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

  // try {
  //     await mongoose.connect(process.env.MONGO_URI, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //       useCreateIndex: true
  //   });
  //     console.log('Connected to Mongodb');
  // } catch (err) {
  //     console.error(err)
  // }
};
const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.listen(3000, () => {
    console.log('Listening on port 3000, auth')
});


// start();

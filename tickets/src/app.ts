import express, {Request, Response} from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {errorHandler} from "@iceshoptickets/common";
import {NotFoundError} from "@iceshoptickets/common";

const app = express();
// make sure tht express is aware that it's behind a proxy of ingress-nginx and still trust it
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    }));

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
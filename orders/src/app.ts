import express, {Request, Response} from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from "@iceshoptickets/common";
import {indexOrderRouter} from "./routes";
import {newOrderRouter} from "./routes/new";
import {showOrderRouter} from "./routes/show";
import {deleteOrderRouter} from "./routes/delete";

const app = express();
// make sure tht express is aware that it's behind a proxy of ingress-nginx and still trust it
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    }));

app.use(currentUser);

app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
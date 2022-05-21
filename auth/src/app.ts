// import express, {Request, Response} from 'express';
// import 'express-async-errors'
// import { json } from 'body-parser';
// import cookieSession from 'cookie-session';
//
// import {currentUserRouter} from "./routes/current-user";
// import {signinRouter} from "./routes/signin";
// import {signupRouter} from "./routes/signup";
// import {signoutRouter} from './routes/signout';
// import {errorHandler} from "@iceshoptickets/common";
// import {NotFoundError} from "@iceshoptickets/common";
//
// const app = express();
// // make sure tht express is aware that it's behind a proxy of ingress-nginx and still trust it
// app.set('trust proxy', true);
// app.use(json());
// app.use(
//     cookieSession({
//         signed: false,
//         secure: false
//     }));
//
// app.use(currentUserRouter);
// app.use(signinRouter);
// app.use(signupRouter);
// app.use(signoutRouter);
//
// app.all('*', async (req: Request, res: Response) => {
//     throw new NotFoundError();
// });
//
// app.use(errorHandler);
//
// export { app };

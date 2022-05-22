import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
// import {currentUser} from "@iceshoptickets/common";

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req: Request, res: Response ) => {
    res.send(req.currentUser)
})

export { router as currentUserRouter }

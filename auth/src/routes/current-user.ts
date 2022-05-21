import express, { Request, Response } from 'express';
// import {currentUser} from "@iceshoptickets/common";

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response ) => {
    res.send('hi')
})

export { router as currentUserRouter }

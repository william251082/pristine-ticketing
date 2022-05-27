import express, {NextFunction, Request, Response} from "express";
import {requireAuth} from "@pristinetickets/common";
import {Order} from "../models/order";

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({
        userId: req.currentUser!.id
    }).populate('ticket');

    if (orders) {
        res.send(orders);
    }
});

export { router as indexOrderRouter };

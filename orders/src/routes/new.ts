import express, { Request, Response } from "express";
import {NotFoundError, requireAuth, validateRequest} from "@iceshoptickets/common";
import mongoose from "mongoose";
import {body} from "express-validator";

const router = express.Router();

router.post('/api/orders', requireAuth,
    [
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        throw new NotFoundError();
    }
    // Make sure the ticket is not already reserved

    // Calculate an expiration date for this order

    // Build the order and save it to the database

    // Publish an event saying that an order was created

    res.send({});
});

export { router as newOrderRouter };
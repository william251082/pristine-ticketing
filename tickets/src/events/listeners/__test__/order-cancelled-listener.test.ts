import mongoose from "mongoose";
import {OrderCancelledEvent} from "@pristinetickets/common";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../models/ticket";
import {Message} from 'node-nats-streaming';
import {OrderCancelledListener} from "../order-cancelled-listener";

const setup = async () => {
    // creates an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);

    // Create and save a ticket
    const orderId = mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: 'fcgvhbjn'
    });
    ticket.set({ orderId });
    await ticket.save();

    // creates a fake data event
    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, ticket, orderId, data, msg };
};

it('updates the ticket, publishes an event, and acks the message', async () => {
    const { listener, ticket, orderId, data, msg } = await setup();

    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    // write assertions to make sure a ticket was created!
    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

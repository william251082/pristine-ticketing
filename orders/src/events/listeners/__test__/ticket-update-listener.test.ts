import {natsWrapper} from "../../../nats-wrapper";
import {TicketUpdatedEvent} from "@iceshoptickets/common";
import mongoose from "mongoose";
import {Message} from 'node-nats-streaming';
import {Ticket} from "../../../models/ticket";
import {TicketUpdatedListener} from "../ticket-updated-listener";

const setup = async () => {
    // creates an instance of the listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // Create and save a ticket
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save();

    // creates a fake data object
    const data: TicketUpdatedEvent['data'] = {
        version: ticket.version + 1,
        id: ticket.id,
        title: 'new concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString()
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    // return everything
    return { msg, data, ticket, listener };
};

it('finds, updates and saves a ticket', async () => {
    const { msg, data, ticket, listener } = await setup();

    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    // write assertions to make sure a ticket was created!
    const updatedTicket = await Ticket.findById(ticket.id);

    // expect(updatedTicket).toBeDefined();
    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { msg, data, ticket, listener } = await setup();

    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
});
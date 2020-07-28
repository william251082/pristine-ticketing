import request from 'supertest';
import { app } from '../../app';
import {Ticket} from "../../models/ticket";

jest.mock('../../nats-wrapper');

it('has a route handler that is listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});
it('can only be accessed if user is signed in', async () => {
     await request(app).post('/api/tickets').send({}).expect(401);
});
it('returns a status other than 401 if user is signed in', async () => {
     const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});
    // console.log('status', response.status)
    expect(response.status).not.toEqual(401);
});
it('returns an error if an invalid title is provided', async () => {
    await  request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: -10,
        })
        .expect(400);
});
it('returns an error if an invalid price is provided', async () => {
    await  request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'valid title',
        })
        .expect(400);
});
it('creates a ticket with valid inputs', async () => {
    // add in a check to make sure a ticket was saved

    // take a look at all the tickets inside Ticket collection
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'valid title';

    await  request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 1.00,
        })
        .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual('1');
});

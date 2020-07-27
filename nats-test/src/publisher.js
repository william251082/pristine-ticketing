"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
var ticket_created_publisher_1 = require("./events/ticket-created-publisher");
console.clear();
var stan = node_nats_streaming_1.default.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});
stan.on('connect', function () {
    console.log('Publisher connected to NATS');
    var publisher = new ticket_created_publisher_1.TicketCreatedPublisher(stan);
    publisher.publish({
        id: '123',
        title: 'concert',
        price: 20
    });
    // const data = JSON.stringify({
    //     id: '123',
    //     title: 'concert',
    //     price: 20,
    // });
    //
    // stan.publish('ticket:created', data, () => {
    //     console.log('Event Published')
    // });
});

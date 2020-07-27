"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
var crypto_1 = require("crypto");
var ticket_created_listener_1 = require("./events/ticket-created-listener");
console.clear();
var stan = node_nats_streaming_1.default.connect('ticketing', crypto_1.randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});
stan.on('connect', function () {
    console.log('Listener connected to NATS');
    stan.on('close', function () {
        console.log('NATS connection closed!');
        process.exit();
    });
    new ticket_created_listener_1.TicketCreatedListener(stan).listen();
});
process.on('SIGINT', function () { stan.close(); });
process.on('SIGTERM', function () { stan.close(); });

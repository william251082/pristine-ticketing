"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
var crypto_1 = require("crypto");
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
    var options = stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('accounting-service');
    var subscription = stan.subscribe('ticket:created', 'queue-group-name', options);
    subscription.on('message', function (msg) {
        var data = msg.getData();
        if (typeof data === 'string') {
            console.log("Received event #" + msg.getSequence() + ", with data: " + data);
        }
        // will tell nats streaming service to tell, we received the message and i has been processed
        msg.ack();
    });
});
process.on('SIGINT', function () { stan.close(); });
process.on('SIGTERM', function () { stan.close(); });

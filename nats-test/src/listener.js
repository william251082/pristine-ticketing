"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
console.clear();
var stan = node_nats_streaming_1.default.connect('ticketing', '123', {
    url: 'http://localhost:4222'
});
stan.on('connect', function () {
    console.log('Listener connected to NATS');
    var subscription = stan.subscribe('ticket:created');
    subscription.on('message', function (msg) {
        var data = msg.getData();
        if (typeof data === 'string') {
            console.log("Received event #" + msg.getSequence() + ", with data: " + data);
        }
    });
});

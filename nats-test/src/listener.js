"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
var stan = node_nats_streaming_1.default.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});
stan.on('connect', function () {
    console.log('Publisher connected to NATS');
});

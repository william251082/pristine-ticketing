"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    new TicketCreatedListener(stan).listen();
});
process.on('SIGINT', function () { stan.close(); });
process.on('SIGTERM', function () { stan.close(); });
var Listener = /** @class */ (function () {
    function Listener(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    Listener.prototype.subscriptionOptions = function () {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    };
    Listener.prototype.listen = function () {
        var _this = this;
        var subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on('message', function (msg) {
            console.log("Message received: " + _this.subject + " / " + _this.queueGroupName);
            var parseData = _this.parseMessage(msg);
            _this.onMessage(parseData, msg);
        });
    };
    Listener.prototype.parseMessage = function (msg) {
        var data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'));
    };
    return Listener;
}());
var TicketCreatedListener = /** @class */ (function (_super) {
    __extends(TicketCreatedListener, _super);
    function TicketCreatedListener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subject = 'ticket:created';
        _this.queueGroupName = 'payment-service';
        return _this;
    }
    TicketCreatedListener.prototype.onMessage = function (data, msg) {
        console.log('Event data!', data);
        msg.ack();
    };
    return TicketCreatedListener;
}(Listener));

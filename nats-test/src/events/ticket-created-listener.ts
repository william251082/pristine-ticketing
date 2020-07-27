import {Message} from "node-nats-streaming";
import {TicketCreatedEvent} from "./ticket-created-event";
import {Listener} from "./base-listener";
import {Subjects} from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated ;
    queueGroupName = 'payment-service';

    onMessage(data: any, msg: Message) {
        console.log('Event data!', data);

        msg.ack();
    }
}
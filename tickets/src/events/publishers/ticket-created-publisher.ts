import {Publisher, Subjects, TicketCreatedEvent} from "@pristinetickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}

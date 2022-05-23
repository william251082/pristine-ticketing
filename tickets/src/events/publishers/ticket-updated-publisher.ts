import {Publisher, Subjects, TicketUpdatedEvent} from "@pristinetickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

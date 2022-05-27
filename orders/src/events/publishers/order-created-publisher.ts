import {OrderCreatedEvent, Publisher, Subjects} from "@pristinetickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

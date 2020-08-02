import {OrderCreatedEvent, Publisher, Subjects} from "@iceshoptickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
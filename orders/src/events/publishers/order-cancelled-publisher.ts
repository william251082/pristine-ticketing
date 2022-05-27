import {OrderCancelledEvent, Publisher, Subjects} from "@pristinetickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

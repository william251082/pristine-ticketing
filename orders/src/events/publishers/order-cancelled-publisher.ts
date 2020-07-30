import {OrderCancelledEvent, Publisher, Subjects} from "@iceshoptickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
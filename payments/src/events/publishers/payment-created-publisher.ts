import { Subjects, Publisher, PaymentCreatedEvent } from '@iceshoptickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

import {ExpirationCompleteEvent, Publisher, Subjects} from "@iceshoptickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
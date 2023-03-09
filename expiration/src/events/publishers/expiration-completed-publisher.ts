import {
  Subjects,
  Publisher,
  ExpirationCompletedEvent,
} from "@shrimpticketing/common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
  readonly subject = Subjects.EXPIRATION_COMPLETED;
}

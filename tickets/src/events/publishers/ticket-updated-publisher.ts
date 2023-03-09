import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@shrimpticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TICKET_UPDATED;
}

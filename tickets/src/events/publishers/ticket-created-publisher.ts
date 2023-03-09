import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@shrimpticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TICKET_CREATED;
}

import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@shrimpticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.ORDER_CREATED;
}

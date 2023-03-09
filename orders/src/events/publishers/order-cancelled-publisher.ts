import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from "@shrimpticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.ORDER_CANCELLED;
}

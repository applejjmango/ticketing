import {
  Listener,
  Subjects,
  ExpirationCompletedEvent,
  OrderStatus,
} from "@shrimpticketing/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "@/constants";
import { Order } from "@/models/order";
import { OrderCancelledPublisher } from "@/events/publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.EXPIRATION_COMPLETED;

  async onMessage(data: ExpirationCompletedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === OrderStatus.COMPLETED) {
      return msg.ack();
    }

    order.set({
      status: OrderStatus.CANCELLED,
    });

    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}

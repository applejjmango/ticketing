import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@shrimpticketing/common";

import { queueGroupName } from "@/constants/constant";
import { expirationQueue } from "@/queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.ORDER_CREATED;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("Waiting this many milliseconds to process the job:", delay);
    console.log("The process order id is ", data.id);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );
  }
}

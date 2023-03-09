import express, { Request, Response } from "express";

import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@shrimpticketing/common";

import { OrderCancelledPublisher } from "@/events/publishers/order-cancelled-publisher";
import { natsWrapper } from "@/nats-wrapper";
import { Order } from "@/models/order";

const router = express.Router();

router.delete("/api/orders/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.CANCELLED;

  await order.save();

  // publishing an event saying this was cancelled!
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(204).send(order);
});

export { router as cancelOrderRouter };

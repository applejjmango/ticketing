import mongoose from "mongoose";
import request from "supertest";

import { app } from "@/app";

// Import Models
import { Order, OrderStatus } from "@/models/order";
import { Ticket } from "@/models/ticket";

it("returns an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
  // Create a new ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "abc",
    price: 10,
  });
  await ticket.save();

  // Create an order
  const order = Order.build({
    ticket,
    userId: "tester",
    status: OrderStatus.CREATED,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "abc",
    price: 10,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo("emits an order created event");

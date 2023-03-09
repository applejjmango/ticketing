import Queue from "bull";
import { natsWrapper } from "@/nats-wrapper";
import { ORDER_EXPIRATION } from "@/constants/constant";
import { ExpirationCompletedPublisher } from "@/events/publishers/expiration-completed-publisher";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>(ORDER_EXPIRATION, {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  new ExpirationCompletedPublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });

  // console.log(
  //   "I want to publish an expiration:complete event for orderId",
  //   job.data.orderId
  // );
});

export { expirationQueue };

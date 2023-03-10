import { Subjects } from "../../subjects";

export interface TicketUpdatedEvent {
  subject: Subjects.TICKET_UPDATED;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}

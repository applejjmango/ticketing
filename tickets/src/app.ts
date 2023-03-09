import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@shrimpticketing/common";

import { createTicketRouter } from "@/routes/new";
import { showTicketRouter } from "@/routes/show";
import { showAllTicketRouter } from "@/routes/showAll";
import { updateTicketRouter } from "@/routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser); // Always after cookie session

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(showAllTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

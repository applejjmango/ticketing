import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@shrimpticketing/common";

// IMPORT ORDER ROUTER
import { newOrderRouter } from "@/routes/new";
import { showOrderRouter } from "@/routes/show";
import { showAllOrderRouter } from "@/routes/showAll";
import { cancelOrderRouter } from "@/routes/cancel";

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

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(showAllOrderRouter);
app.use(cancelOrderRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

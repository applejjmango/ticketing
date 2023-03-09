import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  console.log("Starting....");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDb....");
  } catch (err) {
    console.error(err);
  }
  console.log(app.listen);
  console.log("app => ", app);

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!");
  });
};

start();

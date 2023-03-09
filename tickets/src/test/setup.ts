import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";

import { app } from "@/app";

// Tell Jest to user fake nats-wrapper
jest.mock("@/nats-wrapper.ts");

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  // Every Time we run a test, mock files are reset.
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();

  if (mongo) {
    await mongo.stop();
  }
});

global.signin = () => {
  // Build a JWT payload. {id email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@example.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn the session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cooke with the encoded data
  return [`session=${base64}`];
};

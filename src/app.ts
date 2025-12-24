import { publishUserCreated } from "./producer/userProducer";
import { startUserConsumer } from "./consumer/userConsumer";
import { user } from "./types/user";

async function main() {
  // Start consumer
  startUserConsumer();

  // Send a test message
  const user: user = {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    createdAt: new Date().toISOString()
  };

  await publishUserCreated(user);
}

main();

import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript 🚀" });
});

export default app; 
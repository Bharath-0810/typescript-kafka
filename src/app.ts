import { publishUserCreated } from "./producer/userProducer";
import { startUserConsumer } from "./consumer/userConsumer";
import { startNotificationConsumer } from "./consumer/notificationConsumer";
import { user } from "./types/user";
startUserConsumer();
startNotificationConsumer();


import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript 🚀" });
});
app.post("/users", async (req: Request, res: Response) => {
  const newUser: user = req.body;
  console.log(newUser)
  // Send a test message
  await publishUserCreated(newUser);
  res.send("ok")
})
export default app; 
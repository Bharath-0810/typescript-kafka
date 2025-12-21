import { kafka } from "../config/kafka";
import { user } from "../types/user";

const producer = kafka.producer()

export async function publishUserCreated(user: user) {
  await producer.connect();

  await producer.send({
    topic: "user-created",
    messages: [
      {
        key: user.id,
        value: JSON.stringify(user)
      }
    ]
  });

  console.log("✅ User event published:", user);

  await producer.disconnect();
}

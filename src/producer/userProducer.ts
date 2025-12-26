import { kafka } from "../config/kafka";
import { user } from "../types/user";
import { sendToDLQ } from "./dlqProducer";

const producer = kafka.producer()

export async function publishUserCreated(user: user) {
  try {
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
  } catch (error) {
    console.error("❌ Error publishing user event:", error);
    await sendToDLQ(user, error);
  } finally {
    await producer.disconnect();
  }
}

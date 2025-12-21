import { kafka } from "../config/kafka";
import { user } from "../types/user";

const consumer = kafka.consumer({ groupId: "user-group" });

export async function startUserConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-created", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const user: user = JSON.parse(message.value.toString());

      console.log("📥 User event received:", user);
    }
  });
}

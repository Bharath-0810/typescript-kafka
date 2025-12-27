import { EachMessagePayload } from "kafkajs";
import { kafka } from "../config/kafka";
import { user } from "../types/user";

const consumer = kafka.consumer({ groupId: "notification-group" });

export async function startNotificationConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: "user-created", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }: EachMessagePayload) => {
            if (!message.value) return;

            const userData: user = JSON.parse(message.value.toString());

            console.log(`📧 Sending welcome email to ${userData.email}...`);
            // Simulate email sending delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`✅ Email sent to ${userData.email}`);
        }
    });
}

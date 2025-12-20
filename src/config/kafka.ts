import {Kafka} from 'kafkajs';

export const kafka = new Kafka({
  clientId: "typescript-kafka-app",
  brokers: ["localhost:9092"]
});
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

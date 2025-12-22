// dead letter queue producer
import { kafka} from '../config/kafka';


let dlqProducer = kafka.producer();

export async function sendToDLQ(originalMessage:any,error:unknown){
         await dlqProducer.connect();
          await dlqProducer.send({
                topic: "user-created-dlq",
                messages: [
                {
                    value: JSON.stringify({
                    failedAt: new Date().toISOString(),
                    error: error instanceof Error ? error.message : String(error),
                    payload: originalMessage
                    })
                }
                ]
            });

  console.log("☠️ Message sent to DLQ");

  await dlqProducer.disconnect();
}
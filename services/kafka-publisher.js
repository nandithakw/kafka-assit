import { KafkaClusterHelper } from './KafkaClusterHelper.js';
export class KafkaPublisher extends KafkaClusterHelper {
    constructor() { super(); }
    async publish(publishingDetails) {
        let result = {};
        try {
            let kafka = await this.loadClusterData(publishingDetails.connectionName);
            let producer = kafka.producer();
            await producer.connect();

            await producer.send({
                topic: publishingDetails.topic,
                messages: [
                    { value: publishingDetails.message },
                ],
            })

            await producer.disconnect()
            result = { "message": "succussfully published" }
        } catch (error) {
            result = { "error": error }
        }
        return result;
    }
}



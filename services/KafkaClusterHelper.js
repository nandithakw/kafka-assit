import { Kafka } from 'kafkajs';
import { Connections } from './connections.js';
export const clientId = 'kafka-assit';

export class KafkaClusterHelper {
    async loadClusterData(connectionName) {
        let cons = new Connections();
        let connectionDetails = await cons.getConnectionDetails(connectionName);
        connectionDetails.boostrapservers = connectionDetails.boostrapservers.split(",");
        let kafka = new Kafka({
            clientId: clientId,
            brokers: connectionDetails.boostrapservers
        });
        return kafka;
    }
}

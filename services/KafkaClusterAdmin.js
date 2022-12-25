import { KafkaClusterHelper } from './KafkaClusterHelper.js';


export class KafkaClusterAdmin extends KafkaClusterHelper {
    constructor() { super() }
    async getTopicsList(clusterDetails) {
        let result = {};
        try {
            let kafka = await this.loadClusterData(clusterDetails.connectionName);
            let admin = kafka.admin();
            await admin.connect();

            result = await admin.listTopics();
            await admin.disconnect();

        } catch (error) {
            result.error = error;
        }
        return result;
    }
    async describeResouce(clusterDetails) {
        let result = {};
        try {
            let kafka = await this.loadClusterData(clusterDetails.connectionName);
            let admin = kafka.admin();
            await admin.connect();

            result = await admin.describeConfigs({
                includeSynonyms: false,
                resources: [
                    {
                        type: clusterDetails.resourceType,
                        name: clusterDetails.resourceName
                    }
                ]
            })
            await admin.disconnect();

        } catch (error) {
            result.error = error;
        }
        return result;
    }
    async describeCluster(clusterDetails) {
        let result = {};
        try {
            let kafka = await this.loadClusterData(clusterDetails.connectionName);
            let admin = kafka.admin();
            await admin.connect();

            result = await admin.describeCluster();
            await admin.disconnect();

        } catch (error) {
            result.error = error;
        }
        return result;
    }
}

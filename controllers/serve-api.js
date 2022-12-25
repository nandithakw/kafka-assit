import { KafkaPublisher } from "./../services/kafka-publisher.js";
import { KafkaClusterAdmin } from "./../services/KafkaClusterAdmin.js";
export async function serveApi(requestData) {
    let { request, url, body } = requestData;
    console.log('request ', request.url);
    switch (url) {
        case "/api/publish":
            let publisher = new KafkaPublisher();
            requestData.responseBody = await publisher.publish(body);
            break;
        case "/api/topics":
            let admin = new KafkaClusterAdmin();
            requestData.responseBody = await admin.getTopicsList(body);
            break;

        case "/api/describe-cluster":
            let descAdmin = new KafkaClusterAdmin();
            requestData.responseBody = await descAdmin.describeCluster(body);
            break;

        case "/api/describe-resource":
            let resAdmin = new KafkaClusterAdmin();
            requestData.responseBody = await resAdmin.describeCluster(body);
            break;
        default:
            requestData.responseBody = { "error": "no route found" }
            break;
    }
    return requestData;

}
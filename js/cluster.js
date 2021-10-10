const ConfigStore = require("./services/config-store");
const { GetURLParameter } = require("./services/utils");
const { Kafka } = require('kafkajs');

var kafka;
var admin;

document.addEventListener('DOMContentLoaded', () => {
    let connectionName = GetURLParameter("connectionName");
    alert(connectionName);
    debugger;
    let clusterNameDisplayEle = document.getElementById("clusterNameDisplay");
    clusterNameDisplayEle.innerHTML = connectionName;
    let configStore = new ConfigStore();
    let conn = configStore.readFileByName(connectionName);
    if (!conn) {
        return;
    }
    kafka = new Kafka({
        clientId: 'kafka-assit',
        brokers: conn.brokers
    });
    admin = kafka.admin()
    decsribeCluster();
});

async function decsribeCluster() {

    await admin.connect();

    let details = await admin.describeCluster();
    console.log(details);
    await admin.disconnect();

}

const { Kafka } = require('kafkajs');
const { GetURLParameter } = require('./services/utils');
const ConfigStore = require("./services/config-store");
var kafka;
var admin;
var producer;
const publishButton = document.getElementById("publish-btn");
const topicNameElement =document.getElementById("topicName");
publishButton.addEventListener("click", async () => {
 
  let message = document.getElementById("publishingMessage").value;
  let topicName=topicNameElement.value;
   producer = kafka.producer();
  console.log("Follwoing is ready to be published", topicName, message);
  await producer.connect();

  await producer.send({
    topic: topicName,
    messages: [
      { value: message },
    ],
  })

  await producer.disconnect()



});

document.addEventListener('DOMContentLoaded', () => {
  let topicName = GetURLParameter("topicName");
  topicNameElement.value = topicName;
  let connectionName = GetURLParameter("connectionName");
  //let clusterNameDisplayEle = document.getElementById("clusterNameDisplay");
  //clusterNameDisplayEle.innerHTML = connectionName;
  let configStore = new ConfigStore();
  let conn = configStore.readFileByName(connectionName);
  if (!conn) {
      return;
  }
  kafka = new Kafka({
      clientId: 'kafka-assit',
      brokers: conn.brokers
  });
  
});







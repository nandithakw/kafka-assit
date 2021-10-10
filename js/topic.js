
const { Kafka } = require('kafkajs');
const { GetURLParameter } = require('./services/utils');

const kafka = new Kafka({
  clientId: 'my-app',
  //brokers: ["172.15.100.210:9092", "172.15.100.210:9093", "172.15.100.210:9094", "172.15.100.211:9092", "172.15.100.211:9093", "172.15.100.211:9094"]

  brokers: ['10.201.206.24:9092', '10.201.206.24:9093', '10.201.206.24:9094', '10.201.206.25:9092', '10.201.206.25:9093', '10.201.206.25:9094', '10.201.206.26:9092', '10.201.206.26:9093', '10.201.206.26:9094']
});

const publishButton = document.getElementById("publish-btn");

publishButton.addEventListener("click", async () => {
 
  let message = document.getElementById("publishingMessage").value;
  let topicName = document.getElementById("topicName").value;
  const producer = kafka.producer();
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








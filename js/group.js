
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['10.201.206.24:9092', '10.201.206.24:9093', '10.201.206.24:9094', '10.201.206.25:9092', '10.201.206.25:9093', '10.201.206.25:9094', '10.201.206.26:9092', '10.201.206.26:9093', '10.201.206.26:9094']
})

const publishButton = document.getElementById("publish-btn");

publishButton.addEventListener("click", async () => {

    let grpoupName = document.getElementById("groupName").value;
    const admin = kafka.admin();
    await admin.connect();
    await admin.describeGroups([grpoupName])
        .then((dtls) => {
            console.log(dtls);
            document.getElementById("recievedResponse").value=JSON.stringify(dtls);
        });


    await admin.disconnect()



});


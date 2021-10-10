const fs = require('fs');
const path = require('path');
const os = require('os');
const ConfigStore = require('./services/config-store');
const { config } = require('process');


const createConnectionButton = document.getElementById("create-connection-btn");



createConnectionButton.addEventListener("click", async () => {
    const userHomePath = os.homedir();
    let configStore = new ConfigStore();
    let connectioName = document.getElementById("connectionName").value;
    let bootstrapServers = document.getElementById("bootstrapServers").value;
    let brokers = JSON.parse('[' + bootstrapServers + ']');
    console.log(brokers, "");
    let filePath = path.join(userHomePath, ".kafka-assit", "connections", connectioName + ".json");
    let content = { connectioName: connectioName, "brokers": brokers };
    configStore.createFolders();
    configStore.readConnectionSummaries();
    configStore.saveConfig(filePath, JSON.stringify(content))
        .then(() => { confirm("Saved!") }, (reason) => { confirm("Failed: " + reason) });




})
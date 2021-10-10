
const electron = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');

const userHomePath = os.homedir();
const kafkaAssitHome = path.join(userHomePath, ".kafka-assit");
const connectionsFolder = path.join(kafkaAssitHome, "connections");

class ConfigStore {

    async createFolders() {

        if (!fs.existsSync(kafkaAssitHome)) {
            await fs.mkdir(kafkaAssitHome, function (err) {
                if (err) throw err;
                console.log('Folder Created! @ ' + kafkaAssitHome);
            });
        }

        if (!fs.existsSync(connectionsFolder)) {
            await fs.mkdir(connectionsFolder, function (err) {
                if (err) throw err;
                console.log('Folder Created! @' + connectionsFolder);
            });
        }

    };
    async saveConfig(fileName, content) {
        await fs.writeFile(fileName, content, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
    getData = async () => {
        var y = await "Hello World";
        return y;
    }


    readFileByName(fileName) {
        let fileUrl = path.join(connectionsFolder, fileName + '.json');
        let conn = JSON.parse(fs.readFileSync(fileUrl));
        return conn;
    }
    readConnectionSummaries() {
        let filesList = [];
        let namesList = fs.readdirSync(connectionsFolder);
        if (namesList && namesList.length) {
            namesList.forEach(function (file) {
                // Do whatever you want to do with the file
                let fileUrl = path.join(connectionsFolder, file);
                let conn = JSON.parse(fs.readFileSync(fileUrl));
                filesList.push(conn);
                console.log(fileUrl + "- " + conn.brokers);
            });
        }

        return filesList;
    }
    async readConnectionFileNames() {
        let filesList = [];
        await fs.readdir(connectionsFolder, (err, files) => {

            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file);
            });
            filesList = files;
        });
        return filesList;
    }

}


// expose the class
module.exports = ConfigStore;

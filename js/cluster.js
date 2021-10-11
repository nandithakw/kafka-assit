const ConfigStore = require("./services/config-store");
const { GetURLParameter } = require("./services/utils");
const { Kafka } = require('kafkajs');

var kafka;
var admin;
var topicsDataTable;
var connectionName;
document.addEventListener('DOMContentLoaded', () => {
     connectionName = GetURLParameter("connectionName");
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
function setupTopicsTable(){
    const topicsTable = document.getElementById('topicsTable');
    if (topicsTable) {
        topicsTable.style.visibility = 'visible';     // Show
        topicsDataTable = new simpleDatatables.DataTable(topicsTable);
        document.getElementById("topicsLoadermessage").style.visibility = 'hidden'; 
    }
}
function setTopicListTableRowClickAction() {
    var table = document.getElementById('topicsTable');
    var cells = table.getElementsByTagName('td');
  
    for (var i = 0; i < cells.length; i++) {
      // Take each cell
      var cell = cells[i];
      // do something on onclick event for cell
      cell.onclick = function () {
        // Get the row id where the cell exists
        var rowId = this.parentNode.rowIndex;
  
        var rowsNotSelected = table.getElementsByTagName('tr');
        for (var row = 0; row < rowsNotSelected.length; row++) {
          rowsNotSelected[row].style.backgroundColor = "";
          rowsNotSelected[row].classList.remove('selected');
        }
        var rowSelected = table.getElementsByTagName('tr')[rowId];
        rowSelected.style.backgroundColor = "yellow";
        rowSelected.className += " selected";
  
        msg = 'The ID of the company is: ' + rowSelected.cells[0].innerHTML;
        msg += '\nThe cell value is: ' + this.innerHTML;
        window.location.href = "topic.html?connectionName="+connectionName+"&topicName=" + rowSelected.cells[0].innerHTML;
       // alert(msg);
      }
    }
  
  }
function fillTopicsTable(topics){
    if (topics && topics.length) {
        topics.forEach((element, i, array) => {
          console.log("inside loop", element);
          topicsDataTable.rows().add([element]);
    
        });
        topicsDataTable.update();
        topicsDataTable.refresh();
      }
    
}
async function decsribeCluster() {

    debugger;
    await admin.connect();
    let topicList = await admin.listTopics();
    setupTopicsTable();
    fillTopicsTable(topicList);
    let details = await admin.describeCluster();
    setTopicListTableRowClickAction();
    console.log(details);
    await admin.disconnect();

}
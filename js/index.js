const fs = require('fs');
const path = require('path');
const ConfigStore = require('./services/config-store');

const LeftMenuCreator = require('./services/left-menu-creator');


const connectionListFirst = document.getElementById("createNewConnectionLink");
var connectionsDatatable;



function setRowClickAction() {
  var table = document.getElementById('connectionsTable');
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
      window.location.href = "cluster.html?connectionName=" + rowSelected.cells[0].innerHTML;
     // alert(msg);
    }
  }

}













window.addEventListener('DOMContentLoaded', event => {
  // Simple-DataTables
  // https://github.com/fiduswriter/Simple-DataTables/wiki

  const connectionsTable = document.getElementById('connectionsTable');


  if (connectionsTable) {
    connectionsDatatable = new simpleDatatables.DataTable(connectionsTable);
  }
  let configStore = new ConfigStore();

  let availableConnectioNames = [];
  let conns = configStore.readConnectionSummaries();
  if (conns && Object.keys(conns).length) {
    conns.forEach((element, i, array) => {
      console.log("inside loop", element.connectioName);
      connectionsDatatable.rows().add([element.connectioName, element.brokers]);

    });
    connectionsDatatable.update();
    connectionsDatatable.refresh();
  }


  setRowClickAction();
});



window.addEventListener("load", () => {

  let menuCreator = new LeftMenuCreator();
  let leftMenuNode = menuCreator.createConnectionMenuItemHeader("Perf");
  let leftMenuNodeContent = menuCreator.createConnectionMenuItems("Perf");
  connectionListFirst.parentNode.insertBefore(leftMenuNodeContent, connectionListFirst.nextSibling);
  connectionListFirst.parentNode.insertBefore(leftMenuNode, connectionListFirst.nextSibling);




});







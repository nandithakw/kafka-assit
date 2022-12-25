import  sqlite3  from 'sqlite3';
import  {SQLiteConnecionHelper}  from "./SQLiteConnecionHelper.js";
export class Connections extends SQLiteConnecionHelper {
    constructor() { super(); }
    openDb() {
        this.db = new sqlite3.Database("./kafka-assit-data", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            (err) => {
                // do your thing 
            });
    }

    createConnection(connectionDetails) {
        const { boostrapservers, name } = connectionDetails;
        this.initDb();
        const stmt = this.db.prepare("INSERT or REPLACE INTO clusterconnections VALUES (?,?)");
        stmt.run(name, boostrapservers);
        stmt.finalize();
        this.closeDb();
    }
    async getConnectionDetails(connectionName) {
        this.initDb();
        let results = await this.run("SELECT * FROM clusterconnections WHERE name=?", connectionName);
        this.closeDb();
        return results[0];
    }
}

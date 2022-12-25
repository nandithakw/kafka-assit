
import  sqlite3  from 'sqlite3';
export class SQLiteConnecionHelper {
    constructor() {
        this.db = null;
    }
    openDb() {
        this.db = new sqlite3.Database("./kafka-assit-data", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            (err) => {
                // do your thing 
            });
    }
    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS clusterconnections (
          
          name TEXT PRIMARY KEY,
          boostrapservers TEXT)`;

        this.db.run(sql);

    }
    initDb() {
        this.openDb();
        this.createTable();
    }
    closeDb() { this.db.close(); }
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, function (err,rows) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

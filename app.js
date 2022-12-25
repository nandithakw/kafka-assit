import { startServer } from './start-server.js';
const hostname = '127.0.0.1';
const port = 3000;
import { exec } from 'child_process';
startServer(port, hostname, () => {
    const url = `http://${hostname}:${port}`;
    console.log("server is now listning");
    console.log(`Open a browser and navigate to ${url}`);
    try { exec(`start ${url}`) } catch (error) { console.error(error); };
});

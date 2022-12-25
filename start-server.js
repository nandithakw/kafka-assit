import http from "http";
import { serveng } from "./controllers/serve-ng.js";
import { Connections } from './services/connections.js';
import { serveApi } from "./controllers/serve-api.js";

const server = http.createServer((request, response) => {
    let url = request.url;
    if (!url.startsWith("/api")) {
        serveng(request, response);
    }
    else {
        let body = [];
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let bodyJson = {}; try { bodyJson = JSON.parse(body) } catch (error) { bodyJson = {} };
            serveApi({ request, response, url, body: bodyJson }).then((result) => {
                let { request, response, responseBody } = result;
                handleResponse(request, response, responseBody)
            });

        })

    }

});
const handleResponse = function (request, response, responseBody) {
    response.on('error', (err) => {
        console.error(err);
    });
    if (responseBody.error) { response.statusCode = 400; } else {
        response.statusCode = 200;
    }
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    //const responseBody = { headers, method, url, responseBody };
    if (responseBody) {
        response.write(JSON.stringify(responseBody));
    }
    response.end();

}
export function startServer(port, hostname, callback) {

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
        let cons = new Connections();
        cons.createConnection({ name: "perf", boostrapservers: "10.201.206.24:9092,10.201.206.24:9093,10.201.206.24:9094" });
        callback();
    })
};
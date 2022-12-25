import http from 'http';
import { readFile } from 'fs';
import { extname as _extname } from 'path';
import path from 'path';
export function serveng(request, response) {
    console.log("request is to be served by static views");
    console.log('request  ', request.url);
    console.log(path.dirname(process.execPath));
    var filePath = "ui" + request.url;
    if (request.url == '/') {
        filePath = 'ui/index.html';
    }

    var extname = String(_extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';
    //filePath="kafka-assit-api/ui/kafka-assit/index.html"
    if (extname == '') {
        filePath = 'ui/index.html';
        contentType = mimeTypes[".html"];
    }
  //  filePath =path.join(__dirname, filePath);
    console.log("filePath is ", filePath);
    readFile(filePath, function (error, content) {
        if (error) {
            console.error(error);
            if (error.code == 'ENOENT') {
                readFile('./404.html', function (error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}
const request = require('request');
const http = require('http');

//returns a stream
let s = request('https://5b82c6892fd7f2001417916a.mockapi.io/mock');

let data = ''

s.on('data', (chunk) => {
    data += chunk;
});

JSON.stringify(data);

s.on('end', () => {
    console.log('Got data');
});

server = http.createServer((req, res) => {

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
    };

    res.writeHead(200, headers);
    res.write(data);
    res.end();
});

server.listen(3500);

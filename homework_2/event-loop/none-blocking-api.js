const http = require('http');
const childProcess = require('child_process');

http.createServer(((req, res) => {
    console.log('Request stated...');
    const cp = childProcess.fork(`${__dirname}/none-blocking-child-process.js`);

    cp.on('message', (message) => {
        if (message.status === 'done') {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 'done' }));
        }
    })
})).listen(3000, () => console.log('Port is listening on 3000'));
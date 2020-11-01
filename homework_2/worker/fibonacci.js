const http = require('http');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function fibonacci(num) {
    if (num <= 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

if (isMainThread) {
    http.createServer((req, res) => {
        console.log('Fibonacci is counting...');
        const start = new Date();
        const worker = new Worker(__filename, { workerData: 30 });

        worker.on('message', (result) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(`FINISHED: in ${(new Date - start)/1000} and result is ${result}`);
        });
    }).listen(3000, () => console.log('Listening on port 3000'));
} else {
    parentPort.postMessage(fibonacci(workerData));
}
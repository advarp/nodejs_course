const http = require('http');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Master started. Pid: ${process.pid}`);

    for (let i = 0; i < cpusCount; i++) {
        const worker = cluster.fork();
        worker.on('exit', () => {
            console.log(`Worker died: Pid: ${worker.process.pid}`);
        });
    }
}

if (cluster.worker) {
    let iterate = 1;

    http.createServer(((req, res) => {
        const data = {
            id: process.pid,
            amount: iterate++
        };

        res.writeHead(200);
        res.end(JSON.stringify(data));
    })).listen(3000, () => console.log(`Server started. Pid: ${process.pid}`));
}
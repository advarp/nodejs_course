const http = require('http');

for (let i = 0; i < 100; i++) {
    http.get('http://localhost:3000', (response) => {
        let requestsPerWorker = {}
        let str = '';
        response.on('data', (chunk) => {
            str += chunk;
            const data = JSON.parse(str);
            requestsPerWorker[data.id] = data.amount;

            console.log(requestsPerWorker);
        })
    })
}

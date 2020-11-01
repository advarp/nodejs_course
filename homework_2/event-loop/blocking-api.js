const http = require('http');

function repeat(num) {
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            console.log(`${i}.${j}`);
        }
    }
}

http.createServer(((req, res) => {
    console.log('Request stated...');
    repeat(300);
    res.end(() => console.log({status: 'done'}));
})).listen(3000, () => console.log('Port is listening on 3000'));
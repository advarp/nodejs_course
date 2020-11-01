const http = require('http');

const { APP_CONFIG } = require('./config');
const { logger } = require('./logger');


http.createServer((req, res) => {
    logger.log('New incoming request');

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Hello world!'}));
}).listen(
    APP_CONFIG.PORT,
    () => logger.log(`Listening on port ${APP_CONFIG.PORT}...`)
);
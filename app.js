const bodyParser = require('body-parser');
const express = require('express');
const APP_CONFIG = require('./config');
const logger = require('./logger');
const eventsRouter = require('./events/events-api');
const app = express();
const utils = require('./helpers/utils');

utils.generateEventsInCsv()
    .then(() => logger.log('CSV files with Events has been generated'));

app.use(bodyParser.json())

app.use('/events', eventsRouter);

app.listen(APP_CONFIG.PORT, () =>
    logger.log(`Listening on port ${APP_CONFIG.PORT}`)
);
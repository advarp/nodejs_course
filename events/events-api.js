const eventsRouter = require('express').Router();
const eventsBatchRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const utils = require('../helpers/utils');
const eventsCsvPath = path.join('.', 'data', 'events.csv');

eventsRouter.use('/events-batch', eventsBatchRouter);

function getEvents() {
    return utils.csvToJSON(
        fs.readFileSync(eventsCsvPath).toString()
    )
}

function getEventById(id) {
    return getEvents().find(x => x.id === id);
}

async function deleteEvent(eventId) {
    const events = getEvents().filter(x => x.id !== eventId);
    const eventsInCsv = utils.transformEventsFromJsonToCsv(events);

    await fs.writeFileSync(eventsCsvPath, eventsInCsv);

    return events;
}

async function createEvent(event) {
    const events = [...getEvents(), event];
    const eventsInCsv = utils.transformEventsFromJsonToCsv(events);

    await fs.writeFileSync(eventsCsvPath, eventsInCsv);

    return events;
}

async function updateEvent(eventId, event) {
    const events = getEvents();
    const selected = getEventById(eventId);

    if (!selected) {
        return false;
    }

    const updated = events.map(e => {
        if (e.id === eventId) {
            return event;
        } else {
            return e;
        }
    });

    const eventsInCsv = utils.transformEventsFromJsonToCsv(updated);
    await fs.writeFileSync(eventsCsvPath, eventsInCsv);

    return updated;
}

eventsRouter.get('/', async (req, res) => {
    const events = await getEvents();

    if (req.query && req.query.location) {
        const byLocation = events.filter(
            event => event.location.toLowerCase() === req.query.location.toLowerCase()
        );

        res.send(byLocation);
        return;
    }

    res.send(events);
})

eventsRouter.get('/:eventId', async (req, res) => {
    const event = getEventById(req.params.eventId);

    if (!event) {
        res.sendStatus(400);
    }

    res.send(event);
})

eventsRouter.delete('/:eventId', async (req, res) => {
    const updated = await deleteEvent(req.params.eventId);

    res.send(updated);
})

eventsRouter.post('/', async (req, res) => {
    const event = req.body;
    const updated = await createEvent(event);

    res.send(updated);
})

eventsRouter.put('/:eventId', async (req, res) => {
    const event = req.body;
    const eventId = req.params.eventId;

    const updated = await updateEvent(eventId, event);

    res.send(updated)
})

eventsBatchRouter.get('/', (req, res) => {
    let stream = [];

    fs.createReadStream(eventsCsvPath)
        .pipe(csv())
        .on('data', (data) => stream.push(data))
        .on('end', () => res.send(stream));
})

module.exports = eventsRouter;
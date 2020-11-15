const fs = require('fs');
const path = require('path');


const transformEventsFromJsonToCsv = (events) => {
    const headers = 'id,title,location,date,hour';
    const lineSeparator = '\n';
    const data = events.map(item => `${item.id},${item.title},${item.location},${item.date},${item.hour}`).join(lineSeparator);
    return `${headers}${lineSeparator}${data}`
}

function csvToJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }

        result.push(obj);
    }

    return result;
}

const generateEventsInCsv = async () => {
    const pathEventsMock = path.join('.', 'data', 'mock.json');
    const pathEventsCsv = path.join('.', 'data', 'events.csv');

    const events = await JSON.parse(
        fs.readFileSync(pathEventsMock).toString()
    );

    await fs.writeFileSync(pathEventsCsv, transformEventsFromJsonToCsv(events.data));
}


module.exports = {
    generateEventsInCsv,
    transformEventsFromJsonToCsv,
    csvToJSON,
}
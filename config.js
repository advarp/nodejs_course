const DEFAULT_PORT = 3000;
const DEFAULT_ENV = 'dev';


APP_CONFIG = {
    PORT: process.env.PORT || DEFAULT_PORT,
    ENV: DEFAULT_ENV,
    ARGS: getArgs(),
};

function getArgs() {
    return process.argv.reduce((acc , arg, index) => {
        if (index < 2 || arg.indexOf('=') === -1) {
            return acc;
        }

        const props = arg.split('=');

        acc.push({
            name: props[0][0] === '-' ? props[0].slice(1) : props[0],
            value: props[1]
        });

        return acc;
    }, [])
}

module.exports = {
    APP_CONFIG,
}
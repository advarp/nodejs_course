const ENVIRONMENTS = {
    DEVELOPMENT: 'dev',
    PRODUCTION: 'prod',
};

const DEFAULT_PORT = 3000;
const DEFAULT_ENV = ENVIRONMENTS.DEVELOPMENT;

const APP_CONFIG = {
    PORT: process.env.PORT || DEFAULT_PORT,
    ENV: getEnv() || DEFAULT_ENV,
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

function getEnv() {
    return getArgs().find(arg =>
        Object.keys(ENVIRONMENTS).map(key => ENVIRONMENTS[key]).includes(arg.value)
    );
}

module.exports = APP_CONFIG;
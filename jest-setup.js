// hide error messages about act() being unsupported in production build
const ignoredErrors = [
    /act(...) is not supported in production builds of React, and might not behave as expected./
];

const consoleError = global.console.error;

global.console.error = (...args) => {
    if (ignoredErrors.some((el) => el.test(args[0]))) {
        return consoleError(...args);
    }
};

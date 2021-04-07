"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
/* istanbul ignore file */
const config = require("config");
const Raven = require("raven");
class Application {
    constructor() {
        this.startHandlers = [];
        this.shutdownHandlers = [];
    }
    onStart(handler) {
        this.startHandlers.push(handler);
    }
    onShutdown(handler) {
        this.shutdownHandlers.push(handler);
    }
    start() {
        // quit on ctrl-c when running docker in terminal
        process.on('SIGINT', () => {
            console.info('Got SIGINT. Graceful shutdown ', new Date().toISOString());
            this.shutdown();
        });
        // quit properly on docker stop
        process.on('SIGTERM', () => {
            console.info('Got SIGTERM. Graceful shutdown ', new Date().toISOString());
            this.shutdown();
        });
        console.log(`Starting ${config.get('appName')}`);
        this.startHandlers.forEach(handler => handler());
    }
    shutdown() {
        console.log(`Shutting down ${config.get('appName')}`);
        Promise.all(this.shutdownHandlers.map(handler => handler()))
            .then(results => results.forEach(message => console.log(message)))
            .then(() => console.log(`${config.get('appName')} stopped!`))
            .then(() => process.exit())
            .catch((error) => {
            console.error(error);
            Raven.captureException(error);
            process.exit(1);
        });
    }
}
exports.application = new Application();
//# sourceMappingURL=application.js.map
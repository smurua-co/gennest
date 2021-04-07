"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = exports.start = exports.server = void 0;
const logger = require("morgan");
const config = require("config");
const Raven = require("raven");
const application_1 = require("../application");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function start() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (config.util.getEnv('NODE_CONFIG_ENV') !== 'test') {
        app.use(Raven.requestHandler());
        app.use(Raven.errorHandler());
        app.use(logger(config.get('server.logFormat'), { skip: (req) => (req.baseUrl || req.originalUrl).includes('healthcheck') }));
    }
    exports.server = await app.listen(config.get('server.port'));
}
exports.start = start;
const stop = () => new Promise((resolve, reject) => {
    exports.server.close((error) => {
        if (error) {
            reject(error);
        }
        else {
            resolve('Nest Server stopped');
        }
    });
});
exports.stop = stop;
application_1.application.onStart(() => {
    start()
        .then(message => console.log(message))
        .then(() => console.log(`${config.get('appName')} started!`))
        .catch((error) => {
        console.error(error);
        Raven.captureException(error);
        application_1.application.shutdown();
    });
});
application_1.application.onShutdown(() => stop());
//# sourceMappingURL=main.js.map
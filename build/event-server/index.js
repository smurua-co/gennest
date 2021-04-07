"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaServer = void 0;
/* istanbul ignore file */
const event_streamer_1 = require("@comparaonline/event-streamer");
const config = require("config");
const Raven = require("raven");
const router_1 = require("./router");
const application_1 = require("../application");
const winston_1 = require("../initialization/winston");
exports.kafkaServer = new event_streamer_1.KafkaServer(router_1.router, config.get('kafka'), {
    debug: (msg) => winston_1.logger.debug(msg),
    info: (msg) => winston_1.logger.info(msg),
    error: (msg) => winston_1.logger.error(msg)
});
application_1.application.onStart(() => {
    exports.kafkaServer.start();
    exports.kafkaServer.on('error', (error, event) => {
        console.error(error);
        Raven.captureException(error, { extra: { event } }, () => {
            application_1.application.shutdown();
        });
    });
});
application_1.application.onShutdown(() => exports.kafkaServer.stop());
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
const Raven = require("raven");
const config = require("config");
const enabledFor = (env) => ['production', 'staging'].includes(env);
const fail = (message) => { throw new Error(message); };
const activateRaven = () => enabledFor(config.util.getEnv('NODE_CONFIG_ENV') || fail('NODE_ENV should be set'));
Raven.config(activateRaven() && config.get('raven.dsn'), {
    environment: config.util.getEnv('NODE_CONFIG_ENV'),
    autoBreadcrumbs: true,
    captureUnhandledRejections: true
}).install();
//# sourceMappingURL=raven.js.map
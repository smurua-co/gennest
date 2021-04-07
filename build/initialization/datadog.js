"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracer = void 0;
/* istanbul ignore file */
const dd_trace_1 = require("dd-trace");
const config = require("config");
const opentracing = require("opentracing");
const baseConfig = {
    service: config.get('appName'),
    env: process.env.NODE_CONFIG_ENV,
    logInjection: true,
    tags: {
        environment: process.env.NODE_CONFIG_ENV,
        project: config.get('appName'),
        serviceName: config.get('appName')
    }
};
const getDatadogConfig = () => {
    if (!process.env.DD_AGENT_HOST) {
        return Object.assign(Object.assign({}, baseConfig), { debug: false, hostname: config.has('datadog.host') ? config.get('datadog.host') : 'datadog' });
    }
    return Object.assign(Object.assign({}, baseConfig), { hostname: process.env.DD_AGENT_HOST });
};
exports.tracer = dd_trace_1.default.init(getDatadogConfig());
opentracing.initGlobalTracer(exports.tracer);
//# sourceMappingURL=datadog.js.map
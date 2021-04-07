"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.loggerConfig = void 0;
/* istanbul ignore file */
const winston_1 = require("winston");
const config = require("config");
const getConfig = (key, defaultValue) => config.has(key) ? config.get(key) : defaultValue;
const formats = {
    simple: () => winston_1.format.simple(),
    default: () => winston_1.format.json()
};
const getFormat = formats[getConfig('winston.format', 'default')];
exports.loggerConfig = {
    level: config.get('winston.level'),
    format: getFormat(),
    transports: [
        new winston_1.transports.Console()
    ],
    exceptionHandlers: [
        new winston_1.transports.Console()
    ]
};
exports.logger = winston_1.createLogger(exports.loggerConfig);
//# sourceMappingURL=winston.js.map
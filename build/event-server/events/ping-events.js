"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pong = exports.Ping = void 0;
const event_streamer_1 = require("@comparaonline/event-streamer");
const config = require("config");
class Ping extends event_streamer_1.KafkaInputEvent {
    build() { }
}
exports.Ping = Ping;
class Pong extends event_streamer_1.KafkaOutputEvent {
    encode() {
        return {
            service: config.get('appName'),
            uptime: process.uptime()
        };
    }
}
exports.Pong = Pong;
//# sourceMappingURL=ping-events.js.map
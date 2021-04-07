"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const event_streamer_1 = require("@comparaonline/event-streamer");
const ping_events_1 = require("./events/ping-events");
const ping_action_1 = require("./actions/ping-action");
exports.router = new event_streamer_1.Router();
exports.router.add(ping_events_1.Ping, ping_action_1.PingAction);
//# sourceMappingURL=router.js.map
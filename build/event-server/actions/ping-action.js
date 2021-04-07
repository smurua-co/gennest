"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingAction = void 0;
const event_streamer_1 = require("@comparaonline/event-streamer");
const ping_events_1 = require("../events/ping-events");
class PingAction extends event_streamer_1.Action {
    async perform() {
        await this.emit(new ping_events_1.Pong());
    }
}
exports.PingAction = PingAction;
//# sourceMappingURL=ping-action.js.map
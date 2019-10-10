"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const config_1 = require("../../../../config");
const port = config_1.authConfig.redisServerPort;
const host = config_1.authConfig.redisServerURL;
const redisConnection = config_1.isProduction
    ? redis_1.default.createClient(config_1.authConfig.redisConnectionString)
    : redis_1.default.createClient(port, host); // creates a new client
exports.redisConnection = redisConnection;
redisConnection.on('connect', () => {
    console.log(`[Redis]: Connected to redis server at ${host}:${port}`);
});
//# sourceMappingURL=redisConnection.js.map
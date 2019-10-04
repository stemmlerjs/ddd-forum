"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authConfig = {
    secret: process.env.DDD_FORUM_APP_SECRET,
    tokenExpiryTime: 300,
    redisServerPort: process.env.DDD_FORUM_REDIS_PORT || 6379,
    redisServerURL: process.env.DDD_FORUM_REDIS_URL
};
exports.authConfig = authConfig;
//# sourceMappingURL=auth.js.map
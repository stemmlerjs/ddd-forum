"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
exports.authConfig = auth_1.authConfig;
const isProduction = process.env.DDD_FORUM_IS_PRODUCTION === "true";
exports.isProduction = isProduction;
//# sourceMappingURL=index.js.map
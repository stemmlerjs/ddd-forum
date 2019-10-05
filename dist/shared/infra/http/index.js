"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("./utils/Middleware");
const services_1 = require("../../../modules/users/services");
const middleware = new Middleware_1.Middleware(services_1.authService);
exports.middleware = middleware;
//# sourceMappingURL=index.js.map
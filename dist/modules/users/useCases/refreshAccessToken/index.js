"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RefreshAccessToken_1 = require("./RefreshAccessToken");
const repos_1 = require("../../repos");
const services_1 = require("../../services");
const RefreshAccessTokenController_1 = require("./RefreshAccessTokenController");
const refreshAccessToken = new RefreshAccessToken_1.RefreshAccessToken(repos_1.userRepo, services_1.authService);
exports.refreshAccessToken = refreshAccessToken;
const refreshAccessTokenController = new RefreshAccessTokenController_1.RefreshAccessTokenController(refreshAccessToken);
exports.refreshAccessTokenController = refreshAccessTokenController;
//# sourceMappingURL=index.js.map
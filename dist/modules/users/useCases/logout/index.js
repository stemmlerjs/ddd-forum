"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogoutUseCase_1 = require("./LogoutUseCase");
const repos_1 = require("../../repos");
const services_1 = require("../../services");
const LogoutController_1 = require("./LogoutController");
const logoutUseCase = new LogoutUseCase_1.LogoutUseCase(repos_1.userRepo, services_1.authService);
exports.logoutUseCase = logoutUseCase;
const logoutController = new LogoutController_1.LogoutController(logoutUseCase);
exports.logoutController = logoutController;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginUseCase_1 = require("./LoginUseCase");
const LoginController_1 = require("./LoginController");
const services_1 = require("../../services");
const repos_1 = require("../../repos");
const loginUseCase = new LoginUseCase_1.LoginUserUseCase(repos_1.userRepo, services_1.authService);
exports.loginUseCase = loginUseCase;
const loginController = new LoginController_1.LoginController(loginUseCase);
exports.loginController = loginController;
//# sourceMappingURL=index.js.map
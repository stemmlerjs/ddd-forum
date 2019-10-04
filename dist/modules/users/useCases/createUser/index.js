"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserUseCase_1 = require("./CreateUserUseCase");
const CreateUserController_1 = require("./CreateUserController");
const repos_1 = require("../../repos");
const createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(repos_1.userRepo);
exports.createUserUseCase = createUserUseCase;
const createUserController = new CreateUserController_1.CreateUserController(createUserUseCase);
exports.createUserController = createUserController;
//# sourceMappingURL=index.js.map
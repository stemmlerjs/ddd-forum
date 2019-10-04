"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteUserUseCase_1 = require("./DeleteUserUseCase");
const DeleteUserController_1 = require("./DeleteUserController");
const repos_1 = require("../../repos");
const deleteUserUseCase = new DeleteUserUseCase_1.DeleteUserUseCase(repos_1.userRepo);
exports.deleteUserUseCase = deleteUserUseCase;
const deleteUserController = new DeleteUserController_1.DeleteUserController(deleteUserUseCase);
exports.deleteUserController = deleteUserController;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_1 = require("../../../useCases/createUser");
const deleteUser_1 = require("../../../useCases/deleteUser");
const getUserByUserName_1 = require("../../../useCases/getUserByUserName");
const login_1 = require("../../../useCases/login");
const http_1 = require("../../../../../shared/infra/http");
const getCurrentUser_1 = require("../../../useCases/getCurrentUser");
const refreshAccessToken_1 = require("../../../useCases/refreshAccessToken");
const logout_1 = require("../../../useCases/logout");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post('/', (req, res) => createUser_1.createUserController.execute(req, res));
userRouter.get('/me', http_1.middleware.authenticateRequests(), (req, res) => getCurrentUser_1.getCurrentUserController.execute(req, res));
userRouter.post('/login', (req, res) => login_1.loginController.execute(req, res));
userRouter.post('/logout', http_1.middleware.authenticateRequests(), (req, res) => logout_1.logoutController.execute(req, res));
userRouter.post('/token/refresh', (req, res) => refreshAccessToken_1.refreshAccessTokenController.execute(req, res));
userRouter.delete('/:userId', http_1.middleware.authenticateRequests(), (req, res) => deleteUser_1.deleteUserController.execute(req, res));
userRouter.get('/:username', http_1.middleware.authenticateRequests(), (req, res) => getUserByUserName_1.getUserByUserNameController.execute(req, res));
//# sourceMappingURL=index.js.map
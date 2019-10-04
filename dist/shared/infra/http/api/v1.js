"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../../../../modules/users/infra/http/routes");
const v1Router = express_1.default.Router();
exports.v1Router = v1Router;
v1Router.get('/', (req, res) => {
    return res.json({ message: "Yo! we're up" });
});
v1Router.use('/user', routes_1.userRouter);
//# sourceMappingURL=v1.js.map
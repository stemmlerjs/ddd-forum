"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../../../../modules/users/infra/http/routes");
const routes_2 = require("../../../../modules/forum/infra/http/routes");
const post_1 = require("../../../../modules/forum/infra/http/routes/post");
const v1Router = express_1.default.Router();
exports.v1Router = v1Router;
v1Router.get('/', (req, res) => {
    return res.json({ message: "Yo! we're up" });
});
v1Router.use('/users', routes_1.userRouter);
v1Router.use('/members', routes_2.memberRouter);
v1Router.use('/posts', post_1.postRouter);
//# sourceMappingURL=v1.js.map
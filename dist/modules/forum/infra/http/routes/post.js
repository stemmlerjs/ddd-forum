"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("../../../../../shared/infra/http");
const createPost_1 = require("../../../useCases/post/createPost");
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
postRouter.post('/', http_1.middleware.authenticateRequests(), (req, res) => createPost_1.createPostController.execute(req, res));
//# sourceMappingURL=post.js.map
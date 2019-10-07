"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCommentByPostSlug_1 = require("../../../useCases/comments/getCommentByPostSlug");
const http_1 = require("../../../../../shared/infra/http");
const replyToPost_1 = require("../../../useCases/comments/replyToPost");
const commentRouter = express_1.default.Router();
exports.commentRouter = commentRouter;
commentRouter.get('/', (req, res) => getCommentByPostSlug_1.getCommentsByPostSlugContainer.execute(req, res));
commentRouter.post('/', http_1.middleware.authenticateRequests(), (req, res) => replyToPost_1.replyToPostController.execute(req, res));
commentRouter.post('/:commentId/reply'); // post reply
commentRouter.get('/:commentId'); // get comment by id
//# sourceMappingURL=comment.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCommentsByPostSlug_1 = require("../../../useCases/comments/getCommentsByPostSlug");
const http_1 = require("../../../../../shared/infra/http");
const replyToPost_1 = require("../../../useCases/comments/replyToPost");
const getCommentByCommentId_1 = require("../../../useCases/comments/getCommentByCommentId");
const replyToComment_1 = require("../../../useCases/comments/replyToComment");
const commentRouter = express_1.default.Router();
exports.commentRouter = commentRouter;
commentRouter.get('/', (req, res) => getCommentsByPostSlug_1.getCommentsByPostSlugContainer.execute(req, res));
commentRouter.post('/', http_1.middleware.authenticateRequests(), (req, res) => replyToPost_1.replyToPostController.execute(req, res));
commentRouter.post('/:commentId/reply', http_1.middleware.authenticateRequests(), (req, res) => replyToComment_1.replyToCommentController.execute(req, res));
commentRouter.get('/:commentId', (req, res) => getCommentByCommentId_1.getCommentByCommentIdController.execute(req, res));
//# sourceMappingURL=comment.js.map
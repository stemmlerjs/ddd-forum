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
const upvoteComment_1 = require("../../../useCases/comments/upvoteComment");
const downvoteComment_1 = require("../../../useCases/comments/downvoteComment");
const commentRouter = express_1.default.Router();
exports.commentRouter = commentRouter;
commentRouter.get('/', http_1.middleware.includeDecodedTokenIfExists(), (req, res) => getCommentsByPostSlug_1.getCommentsByPostSlugContainer.execute(req, res));
commentRouter.post('/', http_1.middleware.ensureAuthenticated(), (req, res) => replyToPost_1.replyToPostController.execute(req, res));
commentRouter.post('/:commentId/reply', http_1.middleware.ensureAuthenticated(), (req, res) => replyToComment_1.replyToCommentController.execute(req, res));
commentRouter.get('/:commentId', http_1.middleware.includeDecodedTokenIfExists(), (req, res) => getCommentByCommentId_1.getCommentByCommentIdController.execute(req, res));
commentRouter.post('/:commentId/upvote', http_1.middleware.includeDecodedTokenIfExists(), (req, res) => upvoteComment_1.upvoteCommentController.execute(req, res));
commentRouter.post('/:commentId/downvote', http_1.middleware.includeDecodedTokenIfExists(), (req, res) => downvoteComment_1.downvoteCommentController.execute(req, res));
//# sourceMappingURL=comment.js.map
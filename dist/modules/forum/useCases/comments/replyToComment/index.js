"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReplyToComment_1 = require("./ReplyToComment");
const repos_1 = require("../../../repos");
const ReplyToCommentController_1 = require("./ReplyToCommentController");
const services_1 = require("../../../domain/services");
const replyToComment = new ReplyToComment_1.ReplyToComment(repos_1.memberRepo, repos_1.postRepo, repos_1.commentRepo, services_1.postService);
exports.replyToComment = replyToComment;
const replyToCommentController = new ReplyToCommentController_1.ReplyToCommentController(replyToComment);
exports.replyToCommentController = replyToCommentController;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DownvoteComment_1 = require("./DownvoteComment");
const repos_1 = require("../../../repos");
const services_1 = require("../../../domain/services");
const DownvoteCommentController_1 = require("./DownvoteCommentController");
const downvoteComment = new DownvoteComment_1.DownvoteComment(repos_1.postRepo, repos_1.memberRepo, repos_1.commentRepo, repos_1.commentVotesRepo, services_1.postService);
exports.downvoteComment = downvoteComment;
const downvoteCommentController = new DownvoteCommentController_1.DownvoteCommentController(downvoteComment);
exports.downvoteCommentController = downvoteCommentController;
//# sourceMappingURL=index.js.map
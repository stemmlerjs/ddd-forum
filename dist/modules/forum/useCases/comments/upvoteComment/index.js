"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpvoteComment_1 = require("./UpvoteComment");
const repos_1 = require("../../../repos");
const services_1 = require("../../../domain/services");
const UpvoteCommentController_1 = require("./UpvoteCommentController");
const upvoteComment = new UpvoteComment_1.UpvoteComment(repos_1.postRepo, repos_1.memberRepo, repos_1.commentRepo, repos_1.commentVotesRepo, services_1.postService);
exports.upvoteComment = upvoteComment;
const upvoteCommentController = new UpvoteCommentController_1.UpvoteCommentController(upvoteComment);
exports.upvoteCommentController = upvoteCommentController;
//# sourceMappingURL=index.js.map
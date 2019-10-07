"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReplyToPost_1 = require("./ReplyToPost");
const repos_1 = require("../../../repos");
const ReplyToPostController_1 = require("./ReplyToPostController");
const replyToPost = new ReplyToPost_1.ReplyToPost(repos_1.memberRepo, repos_1.postRepo);
exports.replyToPost = replyToPost;
const replyToPostController = new ReplyToPostController_1.ReplyToPostController(replyToPost);
exports.replyToPostController = replyToPostController;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DownvotePost_1 = require("./DownvotePost");
const repos_1 = require("../../../repos");
const services_1 = require("../../../domain/services");
const DownvotePostController_1 = require("./DownvotePostController");
const downvotePost = new DownvotePost_1.DownvotePost(repos_1.memberRepo, repos_1.postRepo, repos_1.postVotesRepo, services_1.postService);
exports.downvotePost = downvotePost;
const downvotePostController = new DownvotePostController_1.DownvotePostController(downvotePost);
exports.downvotePostController = downvotePostController;
//# sourceMappingURL=index.js.map
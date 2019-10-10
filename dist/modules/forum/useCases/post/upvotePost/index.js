"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpvotePost_1 = require("./UpvotePost");
const repos_1 = require("../../../repos");
const services_1 = require("../../../domain/services");
const UpvotePostController_1 = require("./UpvotePostController");
const upvotePost = new UpvotePost_1.UpvotePost(repos_1.memberRepo, repos_1.postRepo, repos_1.postVotesRepo, services_1.postService);
exports.upvotePost = upvotePost;
const upvotePostController = new UpvotePostController_1.UpvotePostController(upvotePost);
exports.upvotePostController = upvotePostController;
//# sourceMappingURL=index.js.map
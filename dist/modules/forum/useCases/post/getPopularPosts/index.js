"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetPopularPosts_1 = require("./GetPopularPosts");
const repos_1 = require("../../../repos");
const GetPopularPostsController_1 = require("./GetPopularPostsController");
const getPopularPosts = new GetPopularPosts_1.GetPopularPosts(repos_1.postRepo, repos_1.memberRepo);
exports.getPopularPosts = getPopularPosts;
const getPopularPostsController = new GetPopularPostsController_1.GetPopularPostsController(getPopularPosts);
exports.getPopularPostsController = getPopularPostsController;
//# sourceMappingURL=index.js.map
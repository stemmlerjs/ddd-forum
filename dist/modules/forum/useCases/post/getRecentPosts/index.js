"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetRecentPosts_1 = require("./GetRecentPosts");
const repos_1 = require("../../../repos");
const GetRecentPostsController_1 = require("./GetRecentPostsController");
const getRecentPosts = new GetRecentPosts_1.GetRecentPosts(repos_1.postRepo);
exports.getRecentPosts = getRecentPosts;
const getRecentPostsController = new GetRecentPostsController_1.GetRecentPostsController(getRecentPosts);
exports.getRecentPostsController = getRecentPostsController;
//# sourceMappingURL=index.js.map
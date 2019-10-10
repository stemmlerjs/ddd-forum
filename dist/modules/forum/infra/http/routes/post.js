"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("../../../../../shared/infra/http");
const createPost_1 = require("../../../useCases/post/createPost");
const getRecentPosts_1 = require("../../../useCases/post/getRecentPosts");
const getPostBySlug_1 = require("../../../useCases/post/getPostBySlug");
const getPopularPosts_1 = require("../../../useCases/post/getPopularPosts");
const upvotePost_1 = require("../../../useCases/post/upvotePost");
const downvotePost_1 = require("../../../useCases/post/downvotePost");
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
postRouter.post('/', http_1.middleware.ensureAuthenticated(), (req, res) => createPost_1.createPostController.execute(req, res));
postRouter.get('/recent', http_1.middleware.includeDecodedTokenIfExists(), (req, res) => getRecentPosts_1.getRecentPostsController.execute(req, res));
postRouter.get('/popular', http_1.middleware.includeDecodedTokenIfExists(), (req, res) => getPopularPosts_1.getPopularPostsController.execute(req, res));
postRouter.get('/', http_1.middleware.includeDecodedTokenIfExists(), (req, res) => getPostBySlug_1.getPostBySlugController.execute(req, res));
postRouter.post('/upvote', http_1.middleware.ensureAuthenticated(), (req, res) => upvotePost_1.upvotePostController.execute(req, res));
postRouter.post('/downvote', http_1.middleware.ensureAuthenticated(), (req, res) => downvotePost_1.downvotePostController.execute(req, res));
//# sourceMappingURL=post.js.map
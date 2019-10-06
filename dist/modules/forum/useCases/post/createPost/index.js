"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreatePost_1 = require("./CreatePost");
const repos_1 = require("../../../repos");
const CreatePostController_1 = require("./CreatePostController");
const createPost = new CreatePost_1.CreatePost(repos_1.postRepo, repos_1.memberRepo);
exports.createPost = createPost;
const createPostController = new CreatePostController_1.CreatePostController(createPost);
exports.createPostController = createPostController;
//# sourceMappingURL=index.js.map
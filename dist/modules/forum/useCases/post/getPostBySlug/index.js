"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetPostBySlug_1 = require("./GetPostBySlug");
const repos_1 = require("../../../repos");
const GetPostBySlugController_1 = require("./GetPostBySlugController");
const getPostBySlug = new GetPostBySlug_1.GetPostBySlug(repos_1.postRepo);
exports.getPostBySlug = getPostBySlug;
const getPostBySlugController = new GetPostBySlugController_1.GetPostBySlugController(getPostBySlug);
exports.getPostBySlugController = getPostBySlugController;
//# sourceMappingURL=index.js.map
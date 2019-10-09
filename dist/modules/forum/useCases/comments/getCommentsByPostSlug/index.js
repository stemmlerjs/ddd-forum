"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetCommentsByPostSlug_1 = require("./GetCommentsByPostSlug");
const repos_1 = require("../../../repos");
const GetCommentsByPostSlugController_1 = require("./GetCommentsByPostSlugController");
const getCommentsByPostSlug = new GetCommentsByPostSlug_1.GetCommentsByPostSlug(repos_1.commentRepo);
exports.getCommentsByPostSlug = getCommentsByPostSlug;
const getCommentsByPostSlugContainer = new GetCommentsByPostSlugController_1.GetCommentsByPostSlugController(getCommentsByPostSlug);
exports.getCommentsByPostSlugContainer = getCommentsByPostSlugContainer;
//# sourceMappingURL=index.js.map
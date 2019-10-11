"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetCommentByCommentId_1 = require("./GetCommentByCommentId");
const repos_1 = require("../../../repos");
const GetCommentByCommentIdController_1 = require("./GetCommentByCommentIdController");
const getCommentByCommentId = new GetCommentByCommentId_1.GetCommentByCommentId(repos_1.commentRepo, repos_1.memberRepo);
exports.getCommentByCommentId = getCommentByCommentId;
const getCommentByCommentIdController = new GetCommentByCommentIdController_1.GetCommentByCommentIdController(getCommentByCommentId);
exports.getCommentByCommentIdController = getCommentByCommentIdController;
//# sourceMappingURL=index.js.map
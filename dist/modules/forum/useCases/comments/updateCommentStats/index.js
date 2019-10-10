"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateCommentStats_1 = require("./UpdateCommentStats");
const repos_1 = require("../../../repos");
const updateCommentStats = new UpdateCommentStats_1.UpdateCommentStats(repos_1.commentRepo, repos_1.commentVotesRepo);
exports.updateCommentStats = updateCommentStats;
//# sourceMappingURL=index.js.map
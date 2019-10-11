"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdatePostStats_1 = require("./UpdatePostStats");
const repos_1 = require("../../../repos");
const updatePostStats = new UpdatePostStats_1.UpdatePostStats(repos_1.postRepo, repos_1.postVotesRepo);
exports.updatePostStats = updatePostStats;
//# sourceMappingURL=index.js.map
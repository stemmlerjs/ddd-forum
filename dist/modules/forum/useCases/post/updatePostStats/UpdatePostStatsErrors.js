"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var UpdatePostStatsErrors;
(function (UpdatePostStatsErrors) {
    class PostNotFoundError extends Result_1.Result {
        constructor(postId) {
            super(false, {
                message: `Couldn't find a post by postId {${postId}}.`
            });
        }
    }
    UpdatePostStatsErrors.PostNotFoundError = PostNotFoundError;
})(UpdatePostStatsErrors = exports.UpdatePostStatsErrors || (exports.UpdatePostStatsErrors = {}));
//# sourceMappingURL=UpdatePostStatsErrors.js.map
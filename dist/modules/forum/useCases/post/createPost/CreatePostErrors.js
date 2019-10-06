"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var CreatePostErrors;
(function (CreatePostErrors) {
    class MemberDoesntExistError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `A forum member doesn't exist for this account.`
            });
        }
    }
    CreatePostErrors.MemberDoesntExistError = MemberDoesntExistError;
})(CreatePostErrors = exports.CreatePostErrors || (exports.CreatePostErrors = {}));
//# sourceMappingURL=CreatePostErrors.js.map
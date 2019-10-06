"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../shared/core/Result");
var LogoutErrors;
(function (LogoutErrors) {
    class UserNotFoundOrDeletedError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `User not found or doesn't exist anymore.`
            });
        }
    }
    LogoutErrors.UserNotFoundOrDeletedError = UserNotFoundOrDeletedError;
})(LogoutErrors = exports.LogoutErrors || (exports.LogoutErrors = {}));
//# sourceMappingURL=LogoutErrors.js.map
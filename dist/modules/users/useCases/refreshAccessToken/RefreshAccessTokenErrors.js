"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../shared/core/Result");
var RefreshAccessTokenErrors;
(function (RefreshAccessTokenErrors) {
    class RefreshTokenNotFound extends Result_1.Result {
        constructor() {
            super(false, {
                message: `Refresh token doesn't exist`
            });
        }
    }
    RefreshAccessTokenErrors.RefreshTokenNotFound = RefreshTokenNotFound;
    class UserNotFoundOrDeletedError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `User not found or doesn't exist anymore.`
            });
        }
    }
    RefreshAccessTokenErrors.UserNotFoundOrDeletedError = UserNotFoundOrDeletedError;
})(RefreshAccessTokenErrors = exports.RefreshAccessTokenErrors || (exports.RefreshAccessTokenErrors = {}));
//# sourceMappingURL=RefreshAccessTokenErrors.js.map
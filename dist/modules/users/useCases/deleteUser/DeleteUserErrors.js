"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../shared/core/Result");
var DeleteUserErrors;
(function (DeleteUserErrors) {
    class UserNotFoundError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `User not found`
            });
        }
    }
    DeleteUserErrors.UserNotFoundError = UserNotFoundError;
})(DeleteUserErrors = exports.DeleteUserErrors || (exports.DeleteUserErrors = {}));
//# sourceMappingURL=DeleteUserErrors.js.map
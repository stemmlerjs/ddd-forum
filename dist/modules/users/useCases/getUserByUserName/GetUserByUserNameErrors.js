"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../shared/core/Result");
var GetUserByUserNameErrors;
(function (GetUserByUserNameErrors) {
    class UserNotFoundError extends Result_1.Result {
        constructor(username) {
            super(false, {
                message: `No user with the username ${username} was found`
            });
        }
    }
    GetUserByUserNameErrors.UserNotFoundError = UserNotFoundError;
})(GetUserByUserNameErrors = exports.GetUserByUserNameErrors || (exports.GetUserByUserNameErrors = {}));
//# sourceMappingURL=GetUserByUserNameErrors.js.map
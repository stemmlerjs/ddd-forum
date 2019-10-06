"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var CreateMemberErrors;
(function (CreateMemberErrors) {
    class UserDoesntExistError extends Result_1.Result {
        constructor(baseUserId) {
            super(false, {
                message: `A user for user id ${baseUserId} doesn't exist or was deleted.`
            });
        }
    }
    CreateMemberErrors.UserDoesntExistError = UserDoesntExistError;
    class MemberAlreadyExistsError extends Result_1.Result {
        constructor(baseUserId) {
            super(false, {
                message: `Member for ${baseUserId} already exists.`
            });
        }
    }
    CreateMemberErrors.MemberAlreadyExistsError = MemberAlreadyExistsError;
})(CreateMemberErrors = exports.CreateMemberErrors || (exports.CreateMemberErrors = {}));
//# sourceMappingURL=CreateMemberErrors.js.map
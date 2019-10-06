"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var GetMemberByUserNameErrors;
(function (GetMemberByUserNameErrors) {
    class MemberNotFoundError extends Result_1.Result {
        constructor(username) {
            super(false, {
                message: `Couldn't find a member with the username ${username}`
            });
        }
    }
    GetMemberByUserNameErrors.MemberNotFoundError = MemberNotFoundError;
})(GetMemberByUserNameErrors = exports.GetMemberByUserNameErrors || (exports.GetMemberByUserNameErrors = {}));
//# sourceMappingURL=GetMemberByUserNameErrors.js.map
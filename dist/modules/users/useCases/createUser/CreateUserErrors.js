"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../shared/core/Result");
var CreateUserErrors;
(function (CreateUserErrors) {
    class EmailAlreadyExistsError extends Result_1.Result {
        constructor(email) {
            super(false, {
                message: `The email ${email} associated for this account already exists`
            });
        }
    }
    CreateUserErrors.EmailAlreadyExistsError = EmailAlreadyExistsError;
    class UsernameTakenError extends Result_1.Result {
        constructor(username) {
            super(false, {
                message: `The username ${username} was already taken`
            });
        }
    }
    CreateUserErrors.UsernameTakenError = UsernameTakenError;
})(CreateUserErrors = exports.CreateUserErrors || (exports.CreateUserErrors = {}));
//# sourceMappingURL=CreateUserErrors.js.map
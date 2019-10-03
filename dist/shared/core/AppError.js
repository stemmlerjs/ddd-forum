"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("./Result");
var AppError;
(function (AppError) {
    class UnexpectedError extends Result_1.Result {
        constructor(err) {
            super(false, {
                message: `An unexpected error occurred.`,
                error: err
            });
            console.log(`[AppError]: An unexpected error occurred`);
            console.error(err);
        }
        static create(err) {
            return new UnexpectedError(err);
        }
    }
    AppError.UnexpectedError = UnexpectedError;
})(AppError = exports.AppError || (exports.AppError = {}));
//# sourceMappingURL=AppError.js.map
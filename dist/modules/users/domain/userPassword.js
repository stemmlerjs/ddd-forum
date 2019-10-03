"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt-nodejs"));
const ValueObject_1 = require("shared/domain/ValueObject");
const Guard_1 = require("shared/core/Guard");
const Result_1 = require("shared/core/Result");
class UserPassword extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    static isAppropriateLength(password) {
        return password.length >= this.minLength;
    }
    /**
     * @method comparePassword
     * @desc Compares as plain-text and hashed password.
     */
    async comparePassword(plainTextPassword) {
        let hashed;
        if (this.isAlreadyHashed()) {
            hashed = this.props.value;
            return this.bcryptCompare(plainTextPassword, hashed);
        }
        else {
            return this.props.value === plainTextPassword;
        }
    }
    bcryptCompare(plainText, hashed) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainText, hashed, (err, compareResult) => {
                if (err)
                    return resolve(false);
                return resolve(compareResult);
            });
        });
    }
    isAlreadyHashed() {
        return this.props.hashed;
    }
    hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, null, null, (err, hash) => {
                if (err)
                    return reject(err);
                resolve(hash);
            });
        });
    }
    getHashedValue() {
        return new Promise((resolve) => {
            if (this.isAlreadyHashed()) {
                return resolve(this.props.value);
            }
            else {
                return resolve(this.hashPassword(this.props.value));
            }
        });
    }
    static create(props) {
        const propsResult = Guard_1.Guard.againstNullOrUndefined(props.value, 'password');
        if (!propsResult.succeeded) {
            return Result_1.Result.fail(propsResult.message);
        }
        else {
            if (!props.hashed) {
                if (!this.isAppropriateLength(props.value)) {
                    return Result_1.Result.fail('Password doesnt meet criteria [8 chars min].');
                }
            }
            return Result_1.Result.ok(new UserPassword({
                value: props.value,
                hashed: !!props.hashed === true
            }));
        }
    }
}
exports.UserPassword = UserPassword;
UserPassword.minLength = 6;
//# sourceMappingURL=userPassword.js.map
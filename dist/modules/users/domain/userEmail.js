"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../shared/core/Result");
const ValueObject_1 = require("../../../shared/domain/ValueObject");
class UserEmail extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    static format(email) {
        return email.trim().toLowerCase();
    }
    static create(email) {
        if (!this.isValidEmail(email)) {
            return Result_1.Result.fail('Email address not valid');
        }
        else {
            return Result_1.Result.ok(new UserEmail({ value: this.format(email) }));
        }
    }
}
exports.UserEmail = UserEmail;
//# sourceMappingURL=userEmail.js.map
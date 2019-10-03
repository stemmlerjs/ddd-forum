"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("shared/domain/ValueObject");
const Result_1 = require("shared/core/Result");
class EmailVerificationToken extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props;
    }
    get token() {
        return this.props.token;
    }
    get expiry() {
        return this.props.expiry;
    }
    isCodeExpired() {
        const date = new Date();
        return date > this.expiry;
    }
    isCodeValid(code) {
        return this.token.toUpperCase() === code.toUpperCase() && !this.isCodeExpired();
    }
    toJSON() {
        return JSON.stringify({
            token: this.token,
            expiry: this.expiry
        });
    }
    static create(rawToken) {
        if (rawToken) {
            const props = JSON.parse(rawToken);
            return Result_1.Result.ok(new EmailVerificationToken(Object.assign(Object.assign({}, props), { expiry: new Date(props.expiry) })));
        }
        //create random 4 character token
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        let token = '';
        for (let i = this.numberDigits; i > 0; --i) {
            token += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        token = token.toUpperCase();
        // create expiration date
        const expires = new Date();
        expires.setHours(expires.getHours() + this.tokenExpiryHours);
        return Result_1.Result.ok(new EmailVerificationToken({
            token: token,
            expiry: expires
        }));
    }
}
exports.EmailVerificationToken = EmailVerificationToken;
EmailVerificationToken.numberDigits = 4;
EmailVerificationToken.tokenExpiryHours = 6;
//# sourceMappingURL=emailVerificationToken.js.map
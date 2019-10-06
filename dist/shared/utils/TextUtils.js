"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextUtils {
    static validateEmailAddress(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    static createRandomNumericString(numberDigits) {
        const chars = '0123456789';
        let value = '';
        for (let i = numberDigits; i > 0; --i) {
            value += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return value;
    }
}
exports.TextUtils = TextUtils;
//# sourceMappingURL=TextUtils.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailVerified {
    constructor(user) {
        this.dateTimeOccurred = new Date();
        this.user = user;
    }
    getAggregateId() {
        return this.user.id;
    }
}
exports.EmailVerified = EmailVerified;
//# sourceMappingURL=emailVerified.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserLoggedIn {
    constructor(user) {
        this.dateTimeOccurred = new Date();
        this.user = user;
    }
    getAggregateId() {
        return this.user.id;
    }
}
exports.UserLoggedIn = UserLoggedIn;
//# sourceMappingURL=userLoggedIn.js.map
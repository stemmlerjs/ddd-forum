"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WatchedList_1 = require("../../../shared/domain/WatchedList");
class Comments extends WatchedList_1.WatchedList {
    constructor(initialVotes) {
        super(initialVotes);
    }
    compareItems(a, b) {
        return a.equals(b);
    }
    static create(comments) {
        return new Comments(comments ? comments : []);
    }
}
exports.Comments = Comments;
//# sourceMappingURL=comments.js.map
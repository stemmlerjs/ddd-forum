"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("shared/domain/Entity");
const Result_1 = require("shared/core/Result");
class UserId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
    static create(id) {
        return Result_1.Result.ok(new UserId(id));
    }
}
exports.UserId = UserId;
//# sourceMappingURL=userId.js.map
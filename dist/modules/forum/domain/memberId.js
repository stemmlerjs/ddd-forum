"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../shared/core/Result");
const Entity_1 = require("../../../shared/domain/Entity");
class MemberId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
    static create(id) {
        return Result_1.Result.ok(new MemberId(id));
    }
}
exports.MemberId = MemberId;
//# sourceMappingURL=memberId.js.map
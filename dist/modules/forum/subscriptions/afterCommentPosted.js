"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userCreated_1 = require("../../users/domain/events/userCreated");
const DomainEvents_1 = require("../../../shared/domain/events/DomainEvents");
class AfterCommentPosted {
    constructor(createMember) {
        this.setupSubscriptions();
        this.createMember = createMember;
    }
    setupSubscriptions() {
        // Register to the domain event
        DomainEvents_1.DomainEvents.register(this.onCommentPosted.bind(this), userCreated_1.UserCreated.name);
    }
    async onCommentPosted(event) {
        // 
    }
}
exports.AfterCommentPosted = AfterCommentPosted;
//# sourceMappingURL=afterCommentPosted.js.map
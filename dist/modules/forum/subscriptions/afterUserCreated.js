"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userCreated_1 = require("../../users/domain/events/userCreated");
const DomainEvents_1 = require("../../../shared/domain/events/DomainEvents");
class AfterUserCreated {
    constructor(createMember) {
        this.setupSubscriptions();
        this.createMember = createMember;
    }
    setupSubscriptions() {
        // Register to the domain event
        DomainEvents_1.DomainEvents.register(this.onUserCreated.bind(this), userCreated_1.UserCreated.name);
    }
    async onUserCreated(event) {
        const { user } = event;
        try {
            await this.createMember.execute({ userId: user.userId.id.toString() });
            console.log(`[AfterUserCreated]: Successfully executed CreateMember use case AfterUserCreated`);
        }
        catch (err) {
            console.log(`[AfterUserCreated]: Failed to execute CreateMember use case AfterUserCreated.`);
        }
    }
}
exports.AfterUserCreated = AfterUserCreated;
//# sourceMappingURL=afterUserCreated.js.map
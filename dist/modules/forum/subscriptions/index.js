"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMember_1 = require("../useCases/members/createMember");
const afterUserCreated_1 = require("./afterUserCreated");
// Subscriptions
new afterUserCreated_1.AfterUserCreated(createMember_1.createMember);
//# sourceMappingURL=index.js.map
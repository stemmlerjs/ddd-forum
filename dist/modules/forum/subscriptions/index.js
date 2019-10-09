"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMember_1 = require("../useCases/members/createMember");
const afterUserCreated_1 = require("./afterUserCreated");
const afterCommentPosted_1 = require("./afterCommentPosted");
const updatePostStats_1 = require("../useCases/post/updatePostStats");
// Subscriptions
new afterUserCreated_1.AfterUserCreated(createMember_1.createMember);
new afterCommentPosted_1.AfterCommentPosted(updatePostStats_1.updatePostStats);
//# sourceMappingURL=index.js.map
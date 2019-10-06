"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateMember_1 = require("./CreateMember");
const repos_1 = require("../../../../users/repos");
const repos_2 = require("../../../repos");
const createMember = new CreateMember_1.CreateMember(repos_1.userRepo, repos_2.memberRepo);
exports.createMember = createMember;
//# sourceMappingURL=index.js.map
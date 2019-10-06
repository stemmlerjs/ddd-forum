"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetMemberByUserName_1 = require("./GetMemberByUserName");
const repos_1 = require("../../../repos");
const GetMemberByUserNameController_1 = require("./GetMemberByUserNameController");
const getMemberByUserName = new GetMemberByUserName_1.GetMemberByUserName(repos_1.memberRepo);
exports.getMemberByUserName = getMemberByUserName;
const getMemberByUserNameController = new GetMemberByUserNameController_1.GetMemberByUserNameController(getMemberByUserName);
exports.getMemberByUserNameController = getMemberByUserNameController;
//# sourceMappingURL=index.js.map
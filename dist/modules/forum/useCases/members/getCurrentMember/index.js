"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetCurrentMemberController_1 = require("./GetCurrentMemberController");
const getMemberByUserName_1 = require("../getMemberByUserName");
const getCurrentMemberController = new GetCurrentMemberController_1.GetCurrentMemberController(getMemberByUserName_1.getMemberByUserName);
exports.getCurrentMemberController = getCurrentMemberController;
//# sourceMappingURL=index.js.map
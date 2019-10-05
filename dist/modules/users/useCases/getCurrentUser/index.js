"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetCurrentUserController_1 = require("./GetCurrentUserController");
const getUserByUserName_1 = require("../getUserByUserName");
const getCurrentUserController = new GetCurrentUserController_1.GetCurrentUserController(getUserByUserName_1.getUserByUserName);
exports.getCurrentUserController = getCurrentUserController;
//# sourceMappingURL=index.js.map
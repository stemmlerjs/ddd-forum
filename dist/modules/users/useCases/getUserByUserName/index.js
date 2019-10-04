"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetUserByUserName_1 = require("./GetUserByUserName");
const GetUserByUserNameController_1 = require("./GetUserByUserNameController");
const repos_1 = require("../../repos");
const getUserByUserName = new GetUserByUserName_1.GetUserByUserName(repos_1.userRepo);
exports.getUserByUserName = getUserByUserName;
const getUserByUserNameController = new GetUserByUserNameController_1.GetUserByUserNameController(getUserByUserName);
exports.getUserByUserNameController = getUserByUserNameController;
//# sourceMappingURL=index.js.map
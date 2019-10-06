"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getMemberByUserName_1 = require("../../../useCases/members/getMemberByUserName");
const getCurrentMember_1 = require("../../../useCases/members/getCurrentMember");
const memberRouter = express_1.default.Router();
exports.memberRouter = memberRouter;
memberRouter.get('/me', (req, res) => getCurrentMember_1.getCurrentMemberController.execute(req, res));
memberRouter.get('/:username', (req, res) => getMemberByUserName_1.getMemberByUserNameController.execute(req, res));
//# sourceMappingURL=member.js.map
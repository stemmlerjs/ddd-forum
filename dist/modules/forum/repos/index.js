"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelizeMemberRepo_1 = require("./implementations/sequelizeMemberRepo");
const models_1 = __importDefault(require("../../../shared/infra/database/sequelize/models"));
const sequelizePostRepo_1 = require("./implementations/sequelizePostRepo");
const memberRepo = new sequelizeMemberRepo_1.MemberRepo(models_1.default);
exports.memberRepo = memberRepo;
const postRepo = new sequelizePostRepo_1.PostRepo(models_1.default);
exports.postRepo = postRepo;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelizeUserRepo_1 = require("./implementations/sequelizeUserRepo");
const models_1 = __importDefault(require("../../../shared/infra/database/sequelize/models"));
const userRepo = new sequelizeUserRepo_1.SequelizeUserRepo(models_1.default);
exports.userRepo = userRepo;
//# sourceMappingURL=index.js.map
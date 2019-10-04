"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userMap_1 = require("../../mappers/userMap");
class SequelizeUserRepo {
    constructor(models) {
        this.models = models;
    }
    async exists(userEmail) {
        const BaseUserModel = this.models.BaseUser;
        const baseUser = await BaseUserModel.findOne({
            where: {
                user_email: userEmail.value
            }
        });
        return !!baseUser === true;
    }
    async getUserByUserName(userName) {
        const BaseUserModel = this.models.BaseUser;
        const baseUser = await BaseUserModel.findOne({
            where: {
                username: userName.value
            }
        });
        if (!!baseUser === false)
            return null;
        return userMap_1.UserMap.toDomain(baseUser);
    }
    async getUserByUserId(userId) {
        const BaseUserModel = this.models.BaseUser;
        const baseUser = await BaseUserModel.findOne({
            where: {
                base_user_id: userId
            }
        });
        if (!!baseUser === false)
            return null;
        return userMap_1.UserMap.toDomain(baseUser);
    }
    async save(user) {
        return null;
    }
}
exports.SequelizeUserRepo = SequelizeUserRepo;
//# sourceMappingURL=sequelizeUserRepo.js.map
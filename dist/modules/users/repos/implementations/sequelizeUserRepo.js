"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userName_1 = require("../../domain/userName");
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
                username: userName instanceof userName_1.UserName
                    ? userName.value
                    : userName
            }
        });
        if (!!baseUser === false)
            throw new Error("User not found.");
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
            throw new Error("User not found.");
        return userMap_1.UserMap.toDomain(baseUser);
    }
    async save(user) {
        const UserModel = this.models.BaseUser;
        const exists = await this.exists(user.email);
        if (!exists) {
            const rawSequelizeUser = await userMap_1.UserMap.toPersistence(user);
            await UserModel.create(rawSequelizeUser);
        }
        return;
    }
}
exports.SequelizeUserRepo = SequelizeUserRepo;
//# sourceMappingURL=sequelizeUserRepo.js.map
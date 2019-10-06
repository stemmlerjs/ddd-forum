"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../domain/user");
const UniqueEntityID_1 = require("../../../shared/domain/UniqueEntityID");
const userName_1 = require("../domain/userName");
const userPassword_1 = require("../domain/userPassword");
const userEmail_1 = require("../domain/userEmail");
class UserMap {
    static toDTO(user) {
        return {
            username: user.username.value,
            isEmailVerified: user.isEmailVerified,
            isAdminUser: user.isAdminUser,
            isDeleted: user.isDeleted
        };
    }
    static toDomain(raw) {
        const userNameOrError = userName_1.UserName.create({ name: raw.username });
        const userPasswordOrError = userPassword_1.UserPassword.create({ value: raw.user_password, hashed: true });
        const userEmailOrError = userEmail_1.UserEmail.create(raw.user_email);
        const userOrError = user_1.User.create({
            username: userNameOrError.getValue(),
            isAdminUser: raw.is_admin_user,
            isDeleted: raw.is_deleted,
            isEmailVerified: raw.is_email_verified,
            password: userPasswordOrError.getValue(),
            email: userEmailOrError.getValue(),
        }, new UniqueEntityID_1.UniqueEntityID(raw.base_user_id));
        userOrError.isFailure ? console.log(userOrError.error) : '';
        return userOrError.isSuccess ? userOrError.getValue() : null;
    }
    static async toPersistence(user) {
        let password = null;
        if (!!user.password === true) {
            if (user.password.isAlreadyHashed()) {
                password = user.password.value;
            }
            else {
                password = await user.password.getHashedValue();
            }
        }
        return {
            base_user_id: user.userId.id.toString(),
            user_email: user.email.value,
            is_email_verified: user.isEmailVerified,
            username: user.username.value,
            user_password: password,
            is_admin_user: user.isAdminUser,
            is_deleted: user.isDeleted
        };
    }
}
exports.UserMap = UserMap;
//# sourceMappingURL=userMap.js.map
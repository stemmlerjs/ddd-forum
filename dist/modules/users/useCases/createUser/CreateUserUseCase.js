"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserErrors_1 = require("./CreateUserErrors");
const Result_1 = require("../../../../shared/core/Result");
const AppError_1 = require("../../../../shared/core/AppError");
const userEmail_1 = require("../../domain/userEmail");
const userPassword_1 = require("../../domain/userPassword");
const userName_1 = require("../../domain/userName");
const user_1 = require("../../domain/user");
class CreateUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(request) {
        const emailOrError = userEmail_1.UserEmail.create(request.email);
        const passwordOrError = userPassword_1.UserPassword.create({ value: request.password });
        const usernameOrError = userName_1.UserName.create({ name: request.username });
        const dtoResult = Result_1.Result.combine([
            emailOrError, passwordOrError, usernameOrError
        ]);
        if (dtoResult.isFailure) {
            return Result_1.left(Result_1.Result.fail(dtoResult.error));
        }
        const email = emailOrError.getValue();
        const password = passwordOrError.getValue();
        const username = usernameOrError.getValue();
        try {
            const userAlreadyExists = await this.userRepo.exists(email);
            if (userAlreadyExists) {
                return Result_1.left(new CreateUserErrors_1.CreateUserErrors.EmailAlreadyExistsError(email.value));
            }
            try {
                const alreadyCreatedUserByUserName = await this.userRepo
                    .getUserByUserName(username);
                const userNameTaken = !!alreadyCreatedUserByUserName === true;
                if (userNameTaken) {
                    return Result_1.left(new CreateUserErrors_1.CreateUserErrors.UsernameTakenError(username.value));
                }
            }
            catch (err) { }
            const userOrError = user_1.User.create({
                email, password, username,
            });
            if (userOrError.isFailure) {
                return Result_1.left(Result_1.Result.fail(userOrError.error.toString()));
            }
            const user = userOrError.getValue();
            await this.userRepo.save(user);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=CreateUserUseCase.js.map
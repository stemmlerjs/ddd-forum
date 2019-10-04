"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginErrors_1 = require("./LoginErrors");
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class LoginController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const dto = this.req.body;
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case LoginErrors_1.LoginUseCaseErrors.UserNameDoesntExistError:
                        return this.notFound(error.errorValue().message);
                    case LoginErrors_1.LoginUseCaseErrors.PasswordDoesntMatchError:
                        return this.clientError(error.getValue().message);
                    default:
                        return this.fail(error.errorValue().message);
                }
            }
            else {
                return this.ok(this.res);
            }
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map
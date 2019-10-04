"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserErrors_1 = require("./CreateUserErrors");
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class CreateUserController extends BaseController_1.BaseController {
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
                    case CreateUserErrors_1.CreateUserErrors.UsernameTakenError:
                        return this.conflict(error.errorValue().message);
                    case CreateUserErrors_1.CreateUserErrors.EmailAlreadyExistsError:
                        return this.conflict(error.errorValue().message);
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
exports.CreateUserController = CreateUserController;
//# sourceMappingURL=CreateUserController.js.map
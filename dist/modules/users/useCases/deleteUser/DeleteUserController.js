"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteUserErrors_1 = require("./DeleteUserErrors");
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class DeleteUserController extends BaseController_1.BaseController {
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
                    case DeleteUserErrors_1.DeleteUserErrors.UserNotFoundError:
                        return this.notFound(error.errorValue().message);
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
exports.DeleteUserController = DeleteUserController;
//# sourceMappingURL=DeleteUserController.js.map
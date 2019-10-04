"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetUserByUserNameErrors_1 = require("./GetUserByUserNameErrors");
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class GetUserByUserNameController extends BaseController_1.BaseController {
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
                    case GetUserByUserNameErrors_1.GetUserByUserNameErrors.UserNotFoundError:
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
exports.GetUserByUserNameController = GetUserByUserNameController;
//# sourceMappingURL=GetUserByUserNameController.js.map
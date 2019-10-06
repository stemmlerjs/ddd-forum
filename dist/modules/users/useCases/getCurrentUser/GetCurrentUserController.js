"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
const userMap_1 = require("../../mappers/userMap");
class GetCurrentUserController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const req = this.req;
        const { username } = req.decoded;
        try {
            const result = await this.useCase.execute({ username });
            if (result.isLeft()) {
                return this.fail(result.value.errorValue().message);
            }
            else {
                const user = result.value.getValue();
                return this.ok(this.res, {
                    user: userMap_1.UserMap.toDTO(user)
                });
            }
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
exports.GetCurrentUserController = GetCurrentUserController;
//# sourceMappingURL=GetCurrentUserController.js.map
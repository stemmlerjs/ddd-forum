"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class LogoutController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const req = this.req;
        const { userId } = req.decoded;
        try {
            const result = await this.useCase.execute({ userId });
            if (result.isLeft()) {
                return this.fail(result.value.errorValue().message);
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
exports.LogoutController = LogoutController;
//# sourceMappingURL=LogoutController.js.map
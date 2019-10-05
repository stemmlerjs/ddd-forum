"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
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
                return this.fail('TODO');
            }
            else {
                // 
                return this.ok(this.res);
            }
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
exports.GetCurrentUserController = GetCurrentUserController;
//# sourceMappingURL=GetCurrentUserController.js.map
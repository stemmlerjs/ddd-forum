"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const memberDetailsMap_1 = require("../../../mappers/memberDetailsMap");
class GetCurrentMemberController extends BaseController_1.BaseController {
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
                const memberDetails = result.value.getValue();
                return this.ok(this.res, {
                    member: memberDetailsMap_1.MemberDetailsMap.toDTO(memberDetails)
                });
            }
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
exports.GetCurrentMemberController = GetCurrentMemberController;
//# sourceMappingURL=GetCurrentMemberController.js.map
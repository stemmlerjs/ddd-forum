"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const GetMemberByUserNameErrors_1 = require("./GetMemberByUserNameErrors");
const memberDetailsMap_1 = require("../../../mappers/memberDetailsMap");
class GetMemberByUserNameController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const dto = {
            username: this.req.params.username
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case GetMemberByUserNameErrors_1.GetMemberByUserNameErrors.MemberNotFoundError:
                        return this.notFound(error.errorValue().message);
                    default:
                        return this.fail(error.errorValue().message);
                }
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
exports.GetMemberByUserNameController = GetMemberByUserNameController;
//# sourceMappingURL=GetMemberByUserNameController.js.map
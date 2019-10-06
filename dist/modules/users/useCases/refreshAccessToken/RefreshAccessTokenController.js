"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
const RefreshAccessTokenErrors_1 = require("./RefreshAccessTokenErrors");
class RefreshAccessTokenController extends BaseController_1.BaseController {
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
                    case RefreshAccessTokenErrors_1.RefreshAccessTokenErrors.RefreshTokenNotFound:
                        return this.notFound(error.errorValue().message);
                    case RefreshAccessTokenErrors_1.RefreshAccessTokenErrors.UserNotFoundOrDeletedError:
                        return this.notFound(error.errorValue().message);
                    default:
                        return this.fail(error.errorValue().message);
                }
            }
            else {
                const accessToken = result.value.getValue();
                return this.ok(this.res, {
                    refreshToken: dto.refreshToken,
                    accessToken: accessToken
                });
            }
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
exports.RefreshAccessTokenController = RefreshAccessTokenController;
//# sourceMappingURL=RefreshAccessTokenController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const DownvotePostErrors_1 = require("./DownvotePostErrors");
class DownvotePostController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const req = this.req;
        const { userId } = req.decoded;
        const dto = {
            userId: userId,
            slug: this.req.body.slug
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case DownvotePostErrors_1.DownvotePostErrors.MemberNotFoundError:
                    case DownvotePostErrors_1.DownvotePostErrors.PostNotFoundError:
                        return this.notFound(error.errorValue().message);
                    case DownvotePostErrors_1.DownvotePostErrors.AlreadyDownvotedError:
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
exports.DownvotePostController = DownvotePostController;
//# sourceMappingURL=DownvotePostController.js.map
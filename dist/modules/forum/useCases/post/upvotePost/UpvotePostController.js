"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const UpvotePostErrors_1 = require("./UpvotePostErrors");
class UpvotePostController extends BaseController_1.BaseController {
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
                    case UpvotePostErrors_1.UpvotePostErrors.MemberNotFoundError:
                    case UpvotePostErrors_1.UpvotePostErrors.PostNotFoundError:
                        return this.notFound(error.errorValue().message);
                    case UpvotePostErrors_1.UpvotePostErrors.AlreadyUpvotedError:
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
exports.UpvotePostController = UpvotePostController;
//# sourceMappingURL=UpvotePostController.js.map
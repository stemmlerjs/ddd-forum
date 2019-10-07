"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const ReplyToPostErrors_1 = require("./ReplyToPostErrors");
class ReplyToPostController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const req = this.req;
        const { userId } = req.decoded;
        const dto = {
            comment: this.req.body.comment,
            userId: userId,
            slug: this.req.query.slug
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case ReplyToPostErrors_1.ReplyToPostErrors.PostNotFoundError:
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
exports.ReplyToPostController = ReplyToPostController;
//# sourceMappingURL=ReplyToPostController.js.map
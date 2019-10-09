"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const ReplyToCommentErrors_1 = require("./ReplyToCommentErrors");
class ReplyToCommentController extends BaseController_1.BaseController {
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
            slug: this.req.query.slug,
            parentCommentId: this.req.params.commentId
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case ReplyToCommentErrors_1.ReplyToCommentErrors.PostNotFoundError:
                        return this.notFound(error.errorValue().message);
                    case ReplyToCommentErrors_1.ReplyToCommentErrors.CommentNotFoundError:
                        return this.notFound(error.errorValue().message);
                    case ReplyToCommentErrors_1.ReplyToCommentErrors.MemberNotFoundError:
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
exports.ReplyToCommentController = ReplyToCommentController;
//# sourceMappingURL=ReplyToCommentController.js.map
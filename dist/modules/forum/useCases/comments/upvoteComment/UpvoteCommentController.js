"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const UpvoteCommentErrors_1 = require("./UpvoteCommentErrors");
class UpvoteCommentController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const req = this.req;
        const { userId } = req.decoded;
        const dto = {
            userId: userId,
            commentId: this.req.params.commentId
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case UpvoteCommentErrors_1.UpvoteCommentErrors.MemberNotFoundError:
                    case UpvoteCommentErrors_1.UpvoteCommentErrors.PostNotFoundError:
                    case UpvoteCommentErrors_1.UpvoteCommentErrors.CommentNotFoundError:
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
exports.UpvoteCommentController = UpvoteCommentController;
//# sourceMappingURL=UpvoteCommentController.js.map
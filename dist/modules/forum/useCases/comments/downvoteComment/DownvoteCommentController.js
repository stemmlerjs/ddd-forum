"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const DownvoteCommentErrors_1 = require("./DownvoteCommentErrors");
class DownvoteCommentController extends BaseController_1.BaseController {
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
                    case DownvoteCommentErrors_1.DownvoteCommentErrors.MemberNotFoundError:
                    case DownvoteCommentErrors_1.DownvoteCommentErrors.PostNotFoundError:
                    case DownvoteCommentErrors_1.DownvoteCommentErrors.CommentNotFoundError:
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
exports.DownvoteCommentController = DownvoteCommentController;
//# sourceMappingURL=DownvoteCommentController.js.map
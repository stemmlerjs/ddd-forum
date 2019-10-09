"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const commentDetailsMap_1 = require("../../../mappers/commentDetailsMap");
const GetCommentByCommentIdErrors_1 = require("./GetCommentByCommentIdErrors");
class GetCommentByCommentIdController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const dto = {
            commentId: this.req.params.commentId
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case GetCommentByCommentIdErrors_1.GetCommentByCommentIdErrors.CommentNotFoundError:
                        return this.notFound(error.errorValue().message);
                    default:
                        return this.fail(error.errorValue().message);
                }
            }
            else {
                const commentDetails = result.value.getValue();
                return this.ok(this.res, {
                    comment: commentDetailsMap_1.CommentDetailsMap.toDTO(commentDetails)
                });
            }
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
exports.GetCommentByCommentIdController = GetCommentByCommentIdController;
//# sourceMappingURL=GetCommentByCommentIdController.js.map
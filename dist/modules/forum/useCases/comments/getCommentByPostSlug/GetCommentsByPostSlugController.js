"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const commentDetailsMap_1 = require("../../../mappers/commentDetailsMap");
class GetCommentsByPostSlugController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const dto = {
            slug: this.req.query.slug,
            offset: this.req.query.offset
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    default:
                        return this.fail(error.errorValue().message);
                }
            }
            else {
                const commentDetails = result.value.getValue();
                return this.ok(this.res, {
                    comments: commentDetails.map((c) => commentDetailsMap_1.CommentDetailsMap.toDTO(c))
                });
            }
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
exports.GetCommentsByPostSlugController = GetCommentsByPostSlugController;
//# sourceMappingURL=GetCommentsByPostSlugController.js.map
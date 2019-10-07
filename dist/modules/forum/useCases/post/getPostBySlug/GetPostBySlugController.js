"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postDetailsMap_1 = require("../../../mappers/postDetailsMap");
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
class GetPostBySlugController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const dto = {
            slug: this.req.query.slug
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
                const postDetails = result.value.getValue();
                return this.ok(this.res, {
                    post: postDetailsMap_1.PostDetailsMap.toDTO(postDetails)
                });
            }
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
exports.GetPostBySlugController = GetPostBySlugController;
//# sourceMappingURL=GetPostBySlugController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const CreatePostErrors_1 = require("./CreatePostErrors");
class CreatePostController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const req = this.req;
        const { userId } = req.decoded;
        const dto = {
            title: this.req.body.title,
            text: this.req.body.text,
            userId: userId,
            postType: this.req.body.postType,
            link: this.req.body.link
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case CreatePostErrors_1.CreatePostErrors.MemberDoesntExistError:
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
exports.CreatePostController = CreatePostController;
//# sourceMappingURL=CreatePostController.js.map
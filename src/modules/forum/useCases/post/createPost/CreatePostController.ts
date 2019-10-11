import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CreatePost } from "./CreatePost";
import { CreatePostDTO } from "./CreatePostDTO";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { CreatePostErrors } from "./CreatePostErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";


export class CreatePostController extends BaseController {
  private useCase: CreatePost;

  constructor (useCase: CreatePost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const req = this.req as DecodedExpressRequest;
    const { userId } = req.decoded;

    const dto: CreatePostDTO = {
      title: TextUtils.sanitize(this.req.body.title),
      text: !!this.req.body.text ? TextUtils.sanitize(this.req.body.text) : null,
      userId: userId,
      postType: this.req.body.postType,
      link: !!this.req.body.link ? TextUtils.sanitize(this.req.body.link) : null
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case CreatePostErrors.MemberDoesntExistError:
            return this.notFound(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
        
      } else {
        return this.ok(this.res);
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
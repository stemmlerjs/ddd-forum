
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { ReplyToPost } from "./ReplyToPost";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { ReplyToPostDTO } from "./ReplyToPostDTO";
import { ReplyToPostErrors } from "./ReplyToPostErrors";

export class ReplyToPostController extends BaseController {
  private useCase: ReplyToPost;

  constructor (useCase: ReplyToPost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const req = this.req as DecodedExpressRequest;
    const { userId } = req.decoded;

    const dto: ReplyToPostDTO = {
      comment: this.req.body.comment,
      userId: userId,
      slug: this.req.query.slug
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case ReplyToPostErrors.PostNotFoundError:
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
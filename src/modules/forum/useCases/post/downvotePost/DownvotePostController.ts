
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DownvotePost } from "./DownvotePost";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { DownvotePostDTO } from "./DownvotePostDTO";
import { DownvotePostErrors } from "./DownvotePostErrors";

export class DownvotePostController extends BaseController {
  private useCase: DownvotePost;

  constructor (useCase: DownvotePost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const req = this.req as DecodedExpressRequest;
    const { userId } = req.decoded;

    const dto: DownvotePostDTO = {
      userId: userId,
      slug: this.req.body.slug
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case DownvotePostErrors.MemberNotFoundError:
          case DownvotePostErrors.PostNotFoundError:
            return this.notFound(error.errorValue().message)
          case DownvotePostErrors.AlreadyDownvotedError:
            return this.conflict(error.errorValue().message)
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
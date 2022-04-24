
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DownvotePost } from "./DownvotePost";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { DownvotePostDTO } from "./DownvotePostDTO";
import { DownvotePostErrors } from "./DownvotePostErrors";
import * as express from 'express'

export class DownvotePostController extends BaseController {
  private useCase: DownvotePost;

  constructor (useCase: DownvotePost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: DownvotePostDTO = {
      userId: userId,
      slug: req.body.slug
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case DownvotePostErrors.MemberNotFoundError:
          case DownvotePostErrors.PostNotFoundError:
            return this.notFound(res, error.getErrorValue().message)
          case DownvotePostErrors.AlreadyDownvotedError:
            return this.conflict(res, error.getErrorValue().message)
          default:
            return this.fail(res, error.getErrorValue().message);
        }
        
      } else {
        return this.ok(res);
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}
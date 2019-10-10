
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DownvoteComment } from "./DownvoteComment";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { DownvoteCommentDTO } from "./DownvoteCommentDTO";
import { DownvoteCommentErrors } from "./DownvoteCommentErrors";

export class DownvoteCommentController extends BaseController {
  private useCase: DownvoteComment;

  constructor (useCase: DownvoteComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const req = this.req as DecodedExpressRequest;
    const { userId } = req.decoded;

    const dto: DownvoteCommentDTO = {
      userId: userId,
      commentId: this.req.params.commentId
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case DownvoteCommentErrors.MemberNotFoundError:
          case DownvoteCommentErrors.PostNotFoundError:
          case DownvoteCommentErrors.CommentNotFoundError:
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
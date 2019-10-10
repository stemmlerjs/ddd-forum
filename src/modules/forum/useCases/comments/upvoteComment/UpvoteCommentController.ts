
import { UpvoteComment } from "./UpvoteComment";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { UpvoteCommentDTO } from "./UpvoteCommentDTO";
import { UpvoteCommentErrors } from "./UpvoteCommentErrors";

export class UpvoteCommentController extends BaseController {
  private useCase: UpvoteComment;

  constructor (useCase: UpvoteComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const req = this.req as DecodedExpressRequest;
    const { userId } = req.decoded;

    const dto: UpvoteCommentDTO = {
      userId: userId,
      commentId: this.req.params.commentId
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case UpvoteCommentErrors.MemberNotFoundError:
          case UpvoteCommentErrors.PostNotFoundError:
          case UpvoteCommentErrors.CommentNotFoundError:
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
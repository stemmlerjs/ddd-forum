import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { ReplyToComment } from "./ReplyToComment";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { ReplyToCommentDTO } from "./ReplyToCommentDTO";
import { ReplyToCommentErrors } from "./ReplyToCommentErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";


export class ReplyToCommentController extends BaseController {
  private useCase: ReplyToComment;

  constructor (useCase: ReplyToComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const req = this.req as DecodedExpressRequest;
    const { userId } = req.decoded;

    const dto: ReplyToCommentDTO = {
      comment: TextUtils.sanitize(this.req.body.comment),
      userId: userId,
      slug: this.req.query.slug,
      parentCommentId: this.req.params.commentId
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case ReplyToCommentErrors.PostNotFoundError:
            return this.notFound(error.errorValue().message)
          case ReplyToCommentErrors.CommentNotFoundError:
            return this.notFound(error.errorValue().message)
          case ReplyToCommentErrors.MemberNotFoundError:
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
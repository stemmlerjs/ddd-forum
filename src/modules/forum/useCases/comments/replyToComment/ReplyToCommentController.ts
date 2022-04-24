import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { ReplyToComment } from "./ReplyToComment";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { ReplyToCommentDTO } from "./ReplyToCommentDTO";
import { ReplyToCommentErrors } from "./ReplyToCommentErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";
import * as express from 'express'

export class ReplyToCommentController extends BaseController {
  private useCase: ReplyToComment;

  constructor (useCase: ReplyToComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: ReplyToCommentDTO = {
      comment: TextUtils.sanitize(req.body.comment),
      userId: userId,
      slug: req.query.slug,
      parentCommentId: req.params.commentId
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case ReplyToCommentErrors.PostNotFoundError:
            return this.notFound(res, error.getErrorValue().message)
          case ReplyToCommentErrors.CommentNotFoundError:
            return this.notFound(res, error.getErrorValue().message)
          case ReplyToCommentErrors.MemberNotFoundError:
            return this.notFound(res, error.getErrorValue().message)
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
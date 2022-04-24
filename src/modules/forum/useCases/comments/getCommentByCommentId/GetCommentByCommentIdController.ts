import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetCommentByCommentId } from "./GetCommentByCommentId";
import { GetCommentByCommentIdRequestDTO } from "./GetCommentByCommentIdRequestDTO";
import { GetCommentByCommentIdResponseDTO } from "./GetCommentByCommentIdResponseDTO";
import { CommentDetailsMap } from "../../../mappers/commentDetailsMap";
import { GetCommentByCommentIdErrors } from "./GetCommentByCommentIdErrors";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from 'express'

export class GetCommentByCommentIdController extends BaseController {
  private useCase: GetCommentByCommentId;

  constructor (useCase: GetCommentByCommentId) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {

    const dto: GetCommentByCommentIdRequestDTO = {
      commentId: req.params.commentId,
      userId: req.decoded ? req.decoded.userId : null
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case GetCommentByCommentIdErrors.CommentNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
        
      } else {
        const commentDetails = result.value.getValue();
        return this.ok<GetCommentByCommentIdResponseDTO>(res, {
          comment:  CommentDetailsMap.toDTO(commentDetails)
        });
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}
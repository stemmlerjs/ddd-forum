import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetCommentByCommentId } from "./GetCommentByCommentId";
import { GetCommentByCommentIdRequestDTO } from "./GetCommentByCommentIdRequestDTO";
import { GetCommentByCommentIdResponseDTO } from "./GetCommentByCommentIdResponseDTO";
import { CommentDetailsMap } from "../../../mappers/commentDetailsMap";
import { GetCommentByCommentIdErrors } from "./GetCommentByCommentIdErrors";


export class GetCommentByCommentIdController extends BaseController {
  private useCase: GetCommentByCommentId;

  constructor (useCase: GetCommentByCommentId) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {

    const dto: GetCommentByCommentIdRequestDTO = {
      commentId: this.req.params.commentId
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case GetCommentByCommentIdErrors.CommentNotFoundError:
            return this.notFound(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
        
      } else {
        const commentDetails = result.value.getValue();
        return this.ok<GetCommentByCommentIdResponseDTO>(this.res, {
          comment:  CommentDetailsMap.toDTO(commentDetails)
        });
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
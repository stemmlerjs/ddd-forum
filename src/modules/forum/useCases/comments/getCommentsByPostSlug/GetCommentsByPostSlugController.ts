
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetCommentsByPostSlug } from "./GetCommentsByPostSlug";
import { GetCommentsByPostSlugRequestDTO } from "./GetCommentsByPostSlugRequestDTO";
import { GetCommentsByPostSlugResponseDTO } from "./GetCommentsByPostSlugResponseDTO";
import { CommentDetailsMap } from "../../../mappers/commentDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from 'express'

export class GetCommentsByPostSlugController extends BaseController {
  private useCase: GetCommentsByPostSlug;

  constructor (useCase: GetCommentsByPostSlug) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {

    const dto: GetCommentsByPostSlugRequestDTO = {
      slug: req.query.slug,
      offset: req.query.offset,
      userId: req.decoded ? req.decoded.userId : null
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
        
      } else {
        const commentDetails = result.value.getValue();
        return this.ok<GetCommentsByPostSlugResponseDTO>(res, {
          comments: commentDetails.map((c) => CommentDetailsMap.toDTO(c))
        });
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}
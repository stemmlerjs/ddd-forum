
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { GetPostBySlug } from "./GetPostBySlug";
import { GetPostBySlugDTO } from "./GetPostBySlugDTO";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { PostDTO } from "../../../dtos/postDTO";
import * as express from 'express'
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";

export class GetPostBySlugController extends BaseController {
  private useCase: GetPostBySlug;

  constructor (useCase: GetPostBySlug) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: GetPostBySlugDTO = {
      slug: req.query.slug
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
        const postDetails = result.value.getValue();
        return this.ok<{ post: PostDTO }>(res, {
          post: PostDetailsMap.toDTO(postDetails)
        });
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}
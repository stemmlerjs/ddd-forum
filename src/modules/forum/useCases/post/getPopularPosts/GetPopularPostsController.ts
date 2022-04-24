
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetPopularPostsRequestDTO } from "./GetPopularPostsRequestDTO";
import { GetPopularPosts } from "./GetPopularPosts";
import { GetPopularPostsResponseDTO } from "./GetPopularPostsResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from 'express'

export class GetPopularPostsController extends BaseController {
  private useCase: GetPopularPosts;

  constructor (useCase: GetPopularPosts) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {

    const dto: GetPopularPostsRequestDTO = {
      offset: req.query.offset,
      userId: !!req.decoded === true ? req.decoded.userId : null
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
        return this.ok<GetPopularPostsResponseDTO>(res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d))
        });
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}
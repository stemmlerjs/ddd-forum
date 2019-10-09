
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetPopularPostsRequestDTO } from "./GetPopularPostsRequestDTO";
import { GetPopularPosts } from "./GetPopularPosts";
import { GetPopularPostsResponseDTO } from "./GetPopularPostsResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";

export class GetPopularPostsController extends BaseController {
  private useCase: GetPopularPosts;

  constructor (useCase: GetPopularPosts) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const req = this.req as DecodedExpressRequest;

    const dto: GetPopularPostsRequestDTO = {
      offset: this.req.query.offset,
      userId: !!req.decoded === true ? req.decoded.userId : null
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          default:
            return this.fail(error.errorValue().message);
        }
        
      } else {
        const postDetails = result.value.getValue();
        return this.ok<GetPopularPostsResponseDTO>(this.res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d))
        });
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
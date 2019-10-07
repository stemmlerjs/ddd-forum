
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetRecentPostsRequestDTO } from "./GetRecentPostsRequestDTO";
import { GetRecentPosts } from "./GetRecentPosts";
import { GetRecentPostsResponseDTO } from "./GetRecentPostsResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";

export class GetRecentPostsController extends BaseController {
  private useCase: GetRecentPosts;

  constructor (useCase: GetRecentPosts) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: GetRecentPostsRequestDTO = {
      offset: this.req.query.offset
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
        return this.ok<GetRecentPostsResponseDTO>(this.res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d))
        });
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
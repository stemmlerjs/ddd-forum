
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { GetPostBySlug } from "./GetPostBySlug";
import { GetPostBySlugDTO } from "./GetPostBySlugDTO";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { PostDTO } from "../../../dtos/postDTO";

export class GetPostBySlugController extends BaseController {
  private useCase: GetPostBySlug;

  constructor (useCase: GetPostBySlug) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: GetPostBySlugDTO = {
      slug: this.req.query.slug
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
        return this.ok<{ post: PostDTO }>(this.res, {
          post: PostDetailsMap.toDTO(postDetails)
        });
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
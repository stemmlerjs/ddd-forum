
import { IPostRepo } from "../postRepo";
import { PostId } from "../../domain/postId";
import { Post } from "../../domain/post";
import { PostMap } from "../../mappers/postMap";
import { PostDetails } from "../../domain/postDetails";
import { PostDetailsMap } from "../../mappers/postDetailsMap";

export class PostRepo implements IPostRepo {

  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery (): any {
    const models = this.models;
    return {
      where: {},
      include: []
    }
  }

  private createBaseDetailsQuery (): any {
    const models = this.models;
    return {
      where: {},
      include: [
        { model: models.Member, as: 'Member', include: [
          { model: models.BaseUser, as: 'BaseUser' }
        ] }
      ],
      limit: 15,
      offset: 0
    }
  }

  public async getRecentPosts (offset?: number): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.offset = offset ? offset : detailsQuery.offset;
    const posts = await PostModel.findAll(detailsQuery);
    return posts.map((p) => PostDetailsMap.toDomain(p))
  }

  public async exists (postId: PostId): Promise<boolean> {
    const PostModel = this.models.Post;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['post_id'] = postId.id.toString();
    const post = await PostModel.findOne(baseQuery);
    const found = !!post === true;
    return found;
  }

  public async save (post: Post): Promise<void> {
    const PostModel = this.models.Post;
    const exists = await this.exists(post.postId);
    
    if (!exists) {
      const rawSequelizePost = await PostMap.toPersistence(post);
      await PostModel.create(rawSequelizePost);
    }
  }
}
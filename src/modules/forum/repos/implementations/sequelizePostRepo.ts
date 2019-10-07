
import { IPostRepo } from "../postRepo";
import { PostId } from "../../domain/postId";
import { Post } from "../../domain/post";
import { PostMap } from "../../mappers/postMap";
import { PostDetails } from "../../domain/postDetails";
import { PostDetailsMap } from "../../mappers/postDetailsMap";
import { ICommentRepo } from "../commentRepo";
import { Comment } from "../../domain/comment";

export class PostRepo implements IPostRepo {

  private models: any;
  private commentRepo: ICommentRepo;

  constructor (models: any, commentRepo: ICommentRepo) {
    this.models = models;
    this.commentRepo = commentRepo;
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

  public async getPostDetailsBySlug (slug: string, offset?: number): Promise<PostDetails> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.where['slug'] = slug;
    const post = await PostModel.findOne(detailsQuery);
    const found = !!post === true;
    if (!found) throw new Error("Post not found");
    return PostDetailsMap.toDomain(post)
  }

  public async getRecentPosts (offset?: number): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.offset = offset ? offset : detailsQuery.offset;
    const posts = await PostModel.findAll(detailsQuery);
    return posts.map((p) => PostDetailsMap.toDomain(p))
  }

  public async getPostBySlug (slug: string): Promise<Post> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where['slug'] = slug;
    const post = await PostModel.findOne(detailsQuery);
    const found = !!post === true;
    if (!found) throw new Error("Post not found");
    return PostMap.toDomain(post);
  }

  public async exists (postId: PostId): Promise<boolean> {
    const PostModel = this.models.Post;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['post_id'] = postId.id.toString();
    const post = await PostModel.findOne(baseQuery);
    const found = !!post === true;
    return found;
  }

  public delete (postId: PostId): Promise<void> {
    const PostModel = this.models.Post;
    return PostModel.destroy({ where: { post_id: postId.id.toString() }});
  }

  private saveComments (comments: Comment[]) {
    return this.commentRepo.saveBulk(comments);
  }

  public async save (post: Post): Promise<void> {
    const PostModel = this.models.Post;
    const exists = await this.exists(post.postId);
    const isNewPost = !exists;
    const rawSequelizePost = await PostMap.toPersistence(post);
    
    if (isNewPost) {

      try {
        await PostModel.create(rawSequelizePost);
        await this.saveComments(post.comments);
        
      } catch (err) {
        await this.delete(post.postId);
        throw new Error(err.toString())
      }

    } else {
      // Save non-aggregate tables before saving the aggregate
      // so that any domain events on the aggregate get dispatched
      await this.saveComments(post.comments);

      const sequelizePostInstance = await PostModel.findOne({ 
        where: { post_id: post.postId.id.toString() }
      });
      await sequelizePostInstance.update(rawSequelizePost);
    }
  }
}
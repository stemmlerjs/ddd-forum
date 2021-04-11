
import { IPostRepo } from "../postRepo";
import { PostId } from "../../domain/postId";
import { Post } from "../../domain/post";
import { PostMap } from "../../mappers/postMap";
import { PostDetails } from "../../domain/postDetails";
import { PostDetailsMap } from "../../mappers/postDetailsMap";
import { ICommentRepo } from "../commentRepo";
import { IPostVotesRepo } from "../postVotesRepo";
import { PostVotes } from "../../domain/postVotes";
import { MemberId } from "../../domain/memberId";
import { Comments } from "../../domain/comments";

export class PostRepo implements IPostRepo {

  private models: any;
  private commentRepo: ICommentRepo;
  private postVotesRepo: IPostVotesRepo;

  constructor (models: any, commentRepo: ICommentRepo, postVotesRepo: IPostVotesRepo) {
    this.models = models;
    this.commentRepo = commentRepo;
    this.postVotesRepo = postVotesRepo;
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
        { 
          model: models.Member, 
          as: 'Member', 
          include: [
            { model: models.BaseUser, as: 'BaseUser' }
          ] 
        }
      ],
      limit: 15,
      offset: 0
    }
  }

  public async getPostByPostId (postId: PostId | string): Promise<Post> {
    postId  = postId instanceof PostId 
    ? (<PostId>postId).id.toString() 
    : postId;
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where['post_id'] = postId;
    const post = await PostModel.findOne(detailsQuery);
    const found = !!post === true;
    if (!found) throw new Error("Post not found");
    return PostMap.toDomain(post);
  }

  public async getNumberOfCommentsByPostId (postId: PostId | string): Promise<number> {
    postId  = postId instanceof PostId 
    ? (<PostId>postId).id.toString() 
    : postId;

    const result = await this.models.sequelize.query(
      `SELECT COUNT(*) FROM comment WHERE post_id = "${postId}";`
    );
    const count = result[0][0]['COUNT(*)'];
    return count;
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

  public async getPopularPosts (offset?: number): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.offset = offset ? offset : detailsQuery.offset;
    detailsQuery['order'] = [
      ['points', 'DESC'],
    ];

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

  private saveComments (comments: Comments) {
    return this.commentRepo.saveBulk(comments.getItems());
  }

  private savePostVotes (postVotes: PostVotes) {
    return this.postVotesRepo.saveBulk(postVotes);
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
        await this.savePostVotes(post.getVotes());
        
      } catch (err) {
        await this.delete(post.postId);
        throw new Error(err.toString())
      }

    } else {
      // Save non-aggregate tables before saving the aggregate
      // so that any domain events on the aggregate get dispatched
      await this.saveComments(post.comments);
      await this.savePostVotes(post.getVotes());
      
      await PostModel.update(rawSequelizePost, { 
        // To make sure your hooks always run, make sure to include this in
        // the query
        individualHooks: true,  
        hooks: true,
        where: { post_id: post.postId.id.toString() }
      });
    }
  }
}
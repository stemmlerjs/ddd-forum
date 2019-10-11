
import { APIResponse } from "../../../shared/infra/services/APIResponse";
import { BaseAPI } from "../../../shared/infra/services/BaseAPI";
import { IAuthService } from "../../users/services/authService";
import { Comment } from "../models/Comment";
import { Result } from "../../../shared/core/Result";
import { right, left } from "../../../shared/core/Either";
import { CommentDTO } from "../dtos/commentDTO";
import { CommentUtil } from "../utils/CommentUtil";

export interface ICommentService {
  createReplyToPost (text: string, slug: string): Promise<APIResponse<void>>;
  createReplyToComment (comment: string, parentCommentId: string, slug: string): Promise<APIResponse<void>>;
  getCommentsBySlug (slug: string, offset?: number): Promise<APIResponse<Comment[]>>;
  getCommentByCommentId (commentId: string): Promise<APIResponse<Comment>>;
  upvoteComment (commentId: string): Promise<APIResponse<void>>;
  downvoteComment (commentId: string): Promise<APIResponse<void>>;
}

export class CommentService extends BaseAPI implements ICommentService {

  constructor (authService: IAuthService) {
    super(authService);
  }

  async createReplyToPost (comment: string, slug: string): Promise<APIResponse<void>> {
    try {
      await this.post('/comments', { comment }, { slug }, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async createReplyToComment (comment: string, parentCommentId: string, slug: string): Promise<APIResponse<void>> {
    try {
      await this.post(`/comments/${parentCommentId}/reply`, { comment }, { slug }, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async getCommentsBySlug (slug: string, offset?: number): Promise<APIResponse<Comment[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get('/comments', { offset, slug }, 
      isAuthenticated ? auth : null
    );

      return right(Result.ok<Comment[]>(
        response.data.comments.map((c: CommentDTO) => CommentUtil.toViewModel(c)))
      );
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async getCommentByCommentId (commentId: string): Promise<APIResponse<Comment>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(`/comments/${commentId}`, null, 
        isAuthenticated ? auth : null
      );
      return right(Result.ok<Comment>(CommentUtil.toViewModel(response.data.comment)));
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async upvoteComment (commentId: string): Promise<APIResponse<void>> {
    try {
      await this.post(`/comments/${commentId}/upvote`, null, null, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async downvoteComment (commentId: string): Promise<APIResponse<void>> {
    try {
      await this.post(`/comments/${commentId}/downvote`, null, null, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

}
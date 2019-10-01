
import axios from 'axios';
import { Comment } from '../models/Comment';
import { AppSettings } from '../models/AppSettings';

interface IAPIService {
  getComments (): Promise<Comment[]>;
  replyToComment (parentCommentId: string, reply: Comment): Promise<any>;
  approveComment (commentId: string): Promise<any>;
  declineComment (commentId: string): Promise<any>;
  updateSettings (settings: AppSettings): Promise<any>;
}

export class APIService implements IAPIService {

  private baseUrl: string = "http://localhost:9021/api/admin"

  constructor () {

  }

  async getComments (): Promise<Comment[]> {
    try {
      const response = await axios({
        method: 'GET',
        url: `${this.baseUrl}/comments`
      });
      return response.data.comments;
    } catch (err) {
      console.log(err)
      return [];
    }
  }

  async replyToComment (parentCommentId: string, reply: Comment): Promise<any> {
    await axios({
      method: 'POST',
      url: `${this.baseUrl}/comments`,
      data: {
        name: 'Khalil Stemmler',
        id: reply.id,
        url: reply.url,
        comment: reply.comment,
        parent: reply.parentCommentId
      }
    })
  }

  async approveComment (commentId: string): Promise<any> {
    await axios({
      method: 'POST',
      url: `${this.baseUrl}/comments/${commentId}/approve`
    })
  }

  async declineComment (commentId: string): Promise<any> {
    await axios({
      method: 'POST',
      url: `${this.baseUrl}/comments/${commentId}/decline`
    })
  }

  async updateSettings (settings: AppSettings): Promise<any> {
    await axios({
      method: 'POST',
      url: `${this.baseUrl}/settings`,
      data: {
        ...settings,
        autoApproveEnabled: settings.autoApproveEnabled ? 1 : 0
      }
    })
  }

}

const apiService = new APIService();

export default apiService;
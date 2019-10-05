//@ts-ignore
import axios, { AxiosInstance } from 'axios';
import { apiConfig } from '../../../config/api';
import { get } from 'lodash'
import { IAuthService } from '../../../modules/users/services/authService';
import { JWTToken } from '../../../modules/users/models/tokens';

export abstract class BaseAPI {
  protected baseUrl: string;
  private axiosInstance: AxiosInstance | any = null;
  public authService: IAuthService;

  constructor (authService: IAuthService) {
    this.authService = authService;
    this.baseUrl = apiConfig.baseUrl
    this.axiosInstance = axios.create({})
    this.enableInterceptors();
  }

  private enableInterceptors (): void {
    this.axiosInstance.interceptors.response.use(
      this.getSuccessResponseHandler(),
      this.getErrorResponseHandler()
    )
  }

  private getSuccessResponseHandler () {
    return (response: any) => {
      return response;
    }
  }

  private didAccessTokenExpire (response: any): boolean {
    return get(response, 'data.message') === "Token signature expired.";
  }

  private async regenerateAccessTokenFromRefreshToken (): Promise<JWTToken> {
    const response = await axios({
      method: 'POST',
      url: `${this.baseUrl}/users/token/refresh`,
      data: {
        refreshToken: this.authService.getToken('refresh-token')
      }
    });
    return response.data.accessToken;
  }

  private getErrorResponseHandler () {
    return async (error: any) => {
      if (this.didAccessTokenExpire(error.response)) {
        const refreshToken = this.authService.getToken('refresh-token');
        const hasRefreshToken = !!refreshToken;

        if (hasRefreshToken) {
          try {
            // Get the new access token
            const accessToken = await this
              .regenerateAccessTokenFromRefreshToken();

            // Save token
            this.authService.setToken('access-token', accessToken);

            // Retry request
            error.config.headers['authorization'] = accessToken;
            return this.axiosInstance.request(error.config);
            
          } catch (err) {
            // remove access and refresh tokens
            this.authService.removeToken('access-token');
            this.authService.removeToken('refresh-token');
            console.log(err);
          }
        }
        
      }
      return Promise.reject({ ...error })
    }
  }

  protected get (url: string, params?: any, headers?: any): Promise<any> {
    return this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params: params ? params : null,
      headers: headers ? headers : null
    })
  }

  protected post (url: string, data?: any, params?: any, headers?: any): Promise<any> { 
    return this.axiosInstance({
      method: 'POST',
      url: `${this.baseUrl}${url}`,
      data: data ? data : null,
      params: params ? params : null,
      headers: headers ? headers : null
    })
  }
}

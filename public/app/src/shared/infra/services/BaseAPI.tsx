//@ts-ignore
import axios from 'axios';
import { apiConfig } from '../../../config/api';

export abstract class BaseAPI {
  protected baseUrl: string;

  constructor () {
    this.baseUrl = apiConfig.baseUrl
  }

  protected get (url: string, params?: any, headers?: any): Promise<any> {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params: params ? params : null,
      headers: headers ? headers : null
    })
  }

  protected post (url: string, data?: any, params?: any, headers?: any): Promise<any> { 
    return axios({
      method: 'POST',
      url: `${this.baseUrl}${url}`,
      data: data ? data : null,
      params: params ? params : null,
      headers: headers ? headers : null
    })
  }
}

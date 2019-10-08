
export interface DomainService {
  execute (...args): Promise<any> | any;
}

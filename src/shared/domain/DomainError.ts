
interface IDomainError {
  message: string;
}

export abstract class DomainError implements IDomainError {
  public readonly message: string;
  
  constructor (message: string) {
    this.message = message;
  }
}

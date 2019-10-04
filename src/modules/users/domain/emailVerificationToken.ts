
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface IEmailTokenProps {
  token: string;
  expiry: Date;
}

export class EmailVerificationToken extends ValueObject<IEmailTokenProps> {

  private static numberDigits = 4;
  private static tokenExpiryHours = 6;

  get value (): IEmailTokenProps {
    return this.props;
  }

  get token (): string {
    return this.props.token;
  }

  get expiry (): Date {
    return this.props.expiry;
  }

  public isCodeExpired (): boolean {
    const date = new Date();
    return date > this.expiry;
  }

  public isCodeValid (code: string): boolean {
    return this.token.toUpperCase() === code.toUpperCase() && !this.isCodeExpired();
  }

  public toJSON (): string {
    return JSON.stringify({
      token: this.token,
      expiry: this.expiry
    })
  }

  private constructor (props: IEmailTokenProps) {
    super(props);
  }

  public static create (rawToken?: string): Result<EmailVerificationToken> {
    if (rawToken) {
      const props: IEmailTokenProps = JSON.parse(rawToken);

      return Result.ok<EmailVerificationToken>(new EmailVerificationToken({
        ...props,
        expiry: new Date(props.expiry)
      }));
    }

    //create random 4 character token
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let token = '';

    for (let i = this.numberDigits; i > 0; --i) {
      token += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    token = token.toUpperCase();

    // create expiration date
    const expires = new Date();
    expires.setHours(expires.getHours() + this.tokenExpiryHours);

    return Result.ok<EmailVerificationToken>(new EmailVerificationToken({
      token: token,
      expiry: expires
    }))
  }
}
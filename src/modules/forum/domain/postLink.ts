
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { TextUtils } from "../../../shared/utils/TextUtils";

interface PostLinkProps {
  url: string;
}

export class PostLink extends ValueObject<PostLinkProps> {
  
  get url (): string {
    return this.props.url;
  }

  private constructor (props: PostLinkProps) {
    super(props);
  };

  public static create (props: PostLinkProps): Result<PostLink> {
    const nullGuard = Guard.againstNullOrUndefined(props.url, 'url');
    
    if (nullGuard.isFailure) {
      return Result.fail<PostLink>(nullGuard.getErrorValue());
    } 

    if (!TextUtils.validateWebURL(props.url)) {
      return Result.fail<PostLink>(`Url {${props.url}} is not valid.`);
    }

    return Result.ok<PostLink>(new PostLink(props));
  }
}
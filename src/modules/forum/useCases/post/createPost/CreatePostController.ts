import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CreatePost } from "./CreatePost";
import { CreatePostDTO } from "./CreatePostDTO";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { CreatePostErrors } from "./CreatePostErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";
import * as express from 'express'


export class CreatePostController extends BaseController {
  private useCase: CreatePost;

  constructor (useCase: CreatePost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: any): Promise<any> {
    const { userId } = req.decoded;

    const dto: CreatePostDTO = {
      title: TextUtils.sanitize(req.body.title),
      text: !!req.body.text ? TextUtils.sanitize(req.body.text) : null,
      userId: userId,
      postType: req.body.postType,
      link: !!req.body.link ? TextUtils.sanitize(req.body.link) : null
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case CreatePostErrors.MemberDoesntExistError:
            return this.notFound(res, error.getErrorValue().message)
          default:
            return this.fail(res, error.getErrorValue().message);
        }
        
      } else {
        return this.ok(res);
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}
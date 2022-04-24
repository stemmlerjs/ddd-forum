
import { GetUserByUserNameErrors } from "./GetUserByUserNameErrors";
import { GetUserByUserNameDTO } from "./GetUserByUserNameDTO";
import { GetUserByUserName } from "./GetUserByUserName";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import * as express from 'express'
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";

export class GetUserByUserNameController extends BaseController {
  private useCase: GetUserByUserName;

  constructor (useCase: GetUserByUserName) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: GetUserByUserNameDTO = req.body as GetUserByUserNameDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case GetUserByUserNameErrors.UserNotFoundError:
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
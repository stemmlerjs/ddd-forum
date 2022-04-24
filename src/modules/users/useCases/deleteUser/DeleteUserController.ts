
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { DeleteUserErrors } from "./DeleteUserErrors";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import * as express from 'express'
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";

export class DeleteUserController extends BaseController {
  private useCase: DeleteUserUseCase;

  constructor (useCase: DeleteUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: DeleteUserDTO = req.body as DeleteUserDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case DeleteUserErrors.UserNotFoundError:
            return this.notFound(res, error.getErrorValue().message)
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } 
      
      else {
        return this.ok(res);
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}
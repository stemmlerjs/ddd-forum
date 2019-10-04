
import { GetUserByUserNameErrors } from "./GetUserByUserNameErrors";
import { GetUserByUserNameDTO } from "./GetUserByUserNameDTO";
import { GetUserByUserName } from "./GetUserByUserName";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";

export class GetUserByUserNameController extends BaseController {
  private useCase: GetUserByUserName;

  constructor (useCase: GetUserByUserName) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: GetUserByUserNameDTO = this.req.body as GetUserByUserNameDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case GetUserByUserNameErrors.UserNotFoundError:
            return this.notFound(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
        
      } else {
        return this.ok(this.res);
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
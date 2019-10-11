
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserErrors } from "./CreateUserErrors";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { TextUtils } from "../../../../shared/utils/TextUtils";

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor (useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    let dto: CreateUserDTO = this.req.body as CreateUserDTO;

    dto = {
      username: TextUtils.sanitize(dto.username),
      email: TextUtils.sanitize(dto.email),
      password: dto.password
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case CreateUserErrors.UsernameTakenError:
            return this.conflict(error.errorValue().message)
          case CreateUserErrors.EmailAlreadyExistsError:
            return this.conflict(error.errorValue().message)
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
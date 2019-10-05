
import { LoginUserUseCase } from "./LoginUseCase";
import { LoginDTO, LoginDTOResponse } from "./LoginDTO";
import { LoginUseCaseErrors } from "./LoginErrors";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";

export class LoginController extends BaseController {
  private useCase: LoginUserUseCase;

  constructor (useCase: LoginUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: LoginDTO = this.req.body as LoginDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case LoginUseCaseErrors.UserNameDoesntExistError:
            return this.notFound(error.errorValue().message)
          case LoginUseCaseErrors.PasswordDoesntMatchError:
            return this.clientError(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        const dto: LoginDTOResponse = result.value.getValue() as LoginDTOResponse;
        return this.ok<LoginDTOResponse>(this.res, dto);
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
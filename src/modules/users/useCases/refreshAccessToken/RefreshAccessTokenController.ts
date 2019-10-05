

import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { RefreshAccessToken } from "./RefreshAccessToken";
import { RefreshAccessTokenDTO } from "./RefreshAccessTokenDTO";
import { RefreshAccessTokenErrors } from "./RefreshAccessTokenErrors";
import { JWTToken } from "../../domain/jwt";
import { LoginDTOResponse } from "../login/LoginDTO";

export class RefreshAccessTokenController extends BaseController {
  private useCase: RefreshAccessToken;

  constructor (useCase: RefreshAccessToken) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: RefreshAccessTokenDTO = this.req.body as RefreshAccessTokenDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case RefreshAccessTokenErrors.RefreshTokenNotFound:
            return this.notFound(error.errorValue().message)
            case RefreshAccessTokenErrors.UserNotFoundOrDeletedError:
              return this.notFound(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        const accessToken: JWTToken = result.value.getValue() as JWTToken;
        return this.ok<LoginDTOResponse>(this.res, {
          refreshToken: dto.refreshToken,
          accessToken: accessToken
        });
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
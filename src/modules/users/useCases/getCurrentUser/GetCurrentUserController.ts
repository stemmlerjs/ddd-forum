
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { GetUserByUserName } from "../getUserByUserName/GetUserByUserName";
import { UserMap } from "../../mappers/userMap";

export class GetCurrentUserController extends BaseController {
  private useCase: GetUserByUserName;

  constructor (useCase: GetUserByUserName) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const req = this.req as DecodedExpressRequest;
    const { username } = req.decoded;

    try {
      const result = await this.useCase.execute({ username });

      if (result.isLeft()) {
        return this.fail(result.value.errorValue().message);
      } else {
        const user = result.value.getValue()
        return this.ok(this.res, {
          user: UserMap.toDTO(user)
        });
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
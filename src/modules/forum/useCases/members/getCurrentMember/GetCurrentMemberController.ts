
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetMemberByUserName } from "../getMemberByUserName/GetMemberByUserName";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetMemberByUserNameResponseDTO } from "../getMemberByUserName/GetMemberByUserNameResponseDTO";
import { MemberDetailsMap } from "../../../mappers/memberDetailsMap";
import * as express from 'express'

export class GetCurrentMemberController extends BaseController {
  private useCase: GetMemberByUserName;

  constructor (useCase: GetMemberByUserName) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { username } = req.decoded;

    try {
      const result = await this.useCase.execute({ username });

      if (result.isLeft()) {
        return this.fail(res, result.value.getErrorValue().message);
      } else {
        const memberDetails = result.value.getValue();
        
        return this.ok<GetMemberByUserNameResponseDTO>(res, {
          member: MemberDetailsMap.toDTO(memberDetails)
        });
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}
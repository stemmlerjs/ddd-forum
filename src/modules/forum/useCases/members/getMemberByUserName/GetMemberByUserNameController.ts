
import { GetMemberByUserName } from "./GetMemberByUserName";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetMemberByUserNameDTO } from "./GetMemberByUserNameDTO";
import { GetMemberByUserNameErrors } from "./GetMemberByUserNameErrors";
import { GetMemberByUserNameResponseDTO } from "./GetMemberByUserNameResponseDTO";
import { MemberDetailsMap } from "../../../mappers/memberDetailsMap";

export class GetMemberByUserNameController extends BaseController {
  private useCase: GetMemberByUserName;

  constructor (useCase: GetMemberByUserName) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: GetMemberByUserNameDTO = {
      username: this.req.params.username
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case GetMemberByUserNameErrors.MemberNotFoundError:
            return this.notFound(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
        
      } else {
        const memberDetails = result.value.getValue();

        return this.ok<GetMemberByUserNameResponseDTO>(this.res, {
          member: MemberDetailsMap.toDTO(memberDetails)
        });
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}
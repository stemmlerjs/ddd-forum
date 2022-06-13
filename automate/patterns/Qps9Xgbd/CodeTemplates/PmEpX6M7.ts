import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { TextUtils } from "../../../../../shared/utils/TextUtils";
import { {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}} } from "./{{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}";
import { {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}DTO } from "./{{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}DTO";
import { {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}Errors } from "./{{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}Errors";


export class {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}Controller extends BaseController {
  private useCase: {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}};

  constructor (useCase: {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: any): Promise<any> {
    const { userId } = req.decoded;

    const dto: {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}DTO = {
      //TODO: populate properties
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
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

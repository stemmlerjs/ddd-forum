
import { UseCase } from "../../../../../shared/core/UseCase"; 
import { I{{Parent.Name |string.pascalsingular}}Repo } from "../../../repos/{{Parent.Name |string.camelsingular}}Repo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { {{Parent.Name |string.pascalsingular}}, {{Parent.Name |string.pascalsingular}}Props } from "../../../domain/{{Parent.Name |string.camelsingular}}";

import { {{Name | string.pascalsingular}}{{Parent.Name |string.pascalsingular}}DTO } from "./{{Name | string.pascalsingular}}{{Parent.Name |string.pascalsingular}}DTO";
import { {{Name | string.pascalsingular}}{{Parent.Name |string.pascalsingular}}Errors } from "./{{Name | string.pascalsingular}}{{Parent.Name |string.pascalsingular}}Errors";

type Response = Either<
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>

export class {{Name | string.pascalsingular}}{{Parent.Name |string.pascalsingular}} implements UseCase<{{Name | string.pascalsingular}}{{Parent.Name |string.pascalsingular}}DTO, Promise<Response>> {
  private {{Parent.Name |string.camelsingular}}Repo: I{{Parent.Name |string.pascalsingular}}Repo;

  constructor ({{Parent.Name |string.camelsingular}}Repo: I{{Parent.Name |string.pascalsingular}}Repo) {
    this.{{Parent.Name |string.camelsingular}}Repo = {{Parent.Name |string.camelsingular}}Repo;
  }
  
  public async execute (request: {{Name | string.pascalsingular}}{{Parent.Name |string.pascalsingular}}DTO): Promise<Response> {
    let {{Parent.Name |string.camelsingular}}: {{Parent.Name |string.pascalsingular}};

    try {

      //TODO: construct your state

      const {{Parent.Name |string.camelsingular}}Props: {{Parent.Name |string.pascalsingular}}Props = {
        //TODO: initialize your properties
      }

      const {{Parent.Name |string.camelsingular}}OrError = {{Parent.Name |string.pascalsingular}}.create({{Parent.Name |string.camelsingular}}Props);

      if ({{Parent.Name |string.camelsingular}}OrError.isFailure) {
        return left({{Parent.Name |string.camelsingular}}OrError);
      }

      {{Parent.Name |string.camelsingular}} = {{Parent.Name |string.camelsingular}}OrError.getValue();

      await this.{{Parent.Name |string.camelsingular}}Repo.save({{Parent.Name |string.camelsingular}});

      return right(Result.ok<void>())

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

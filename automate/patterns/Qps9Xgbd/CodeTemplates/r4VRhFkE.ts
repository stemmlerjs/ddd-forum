
import { Mapper } from "../../../shared/infra/Mapper";
import { {{Name | string.pascalsingular}} } from "../domain/{{Name | string.camelsingular}}";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class {{Name | string.pascalsingular}}Map implements Mapper<{{Name | string.pascalsingular}}> {

  public static toDomain (raw: any): {{Name | string.pascalsingular}} {
    
    const {{Name | string.camelsingular}}OrError = {{Name | string.pascalsingular}}.create({
      //TODO: map properties to domain
    }, new UniqueEntityID(raw.{{Name | string.camelsingular}}_id))

    {{Name | string.camelsingular}}OrError.isFailure ? console.log({{Name | string.camelsingular}}OrError.getErrorValue()) : '';

    return {{Name | string.camelsingular}}OrError.isSuccess ? {{Name | string.camelsingular}}OrError.getValue() : null;
  }

  public static toPersistence ({{Name | string.camelsingular}}: {{Name | string.pascalsingular}}): any {
    return {
      //TODO: map properties to persist
      updatedAt: new Date().toString(),
      {{Name | string.camelsingular}}_id: {{Name | string.camelsingular}}.{{Name | string.camelsingular}}Id.id.toString(),
    }
  }
}

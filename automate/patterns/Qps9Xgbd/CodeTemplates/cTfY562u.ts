
import { {{Name | string.pascalsingular}} } from "../domain/{{Name | string.camelsingular}}";
import { {{Name | string.pascalsingular}}Id } from "../domain/{{Name | string.camelsingular}}Id";

export interface I{{Name | string.pascalsingular}}Repo {
  //TODO: add repository methods
  exists ({{Name | string.camelsingular}}Id: {{Name | string.pascalsingular}}Id): Promise<boolean>;
  save ({{Name | string.camelsingular}}: {{Name | string.pascalsingular}}): Promise<void>;
  delete ({{Name | string.camelsingular}}Id: {{Name | string.pascalsingular}}Id): Promise<void>;
}

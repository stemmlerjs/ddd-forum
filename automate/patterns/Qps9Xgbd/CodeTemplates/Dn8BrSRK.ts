
import { {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}} } from "./{{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}";
import { {{Parent.Name | string.camelsingular}}Repo } from "../../../repos";
import { {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}Controller } from "./{{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}Controller";

const {{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}} = new {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}({{Parent.Name | string.camelsingular}}Repo);
const {{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}Controller = new {{Name | string.pascalsingular}}{{Parent.Name | string.pascalsingular}}Controller(
  {{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}
);

export { 
  {{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}},
  {{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}Controller
}


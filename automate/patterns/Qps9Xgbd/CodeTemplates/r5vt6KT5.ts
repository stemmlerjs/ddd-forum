
import models from "../../../shared/infra/database/sequelize/models";
import { {{Name | string.pascalsingular}}Repo } from "./implementations/sequelize{{Name | string.pascalsingular}}Repo";

const {{Name | string.camelsingular}}Repo = new {{Name | string.pascalsingular}}Repo(models);

export { {{Name | string.camelsingular}}Repo };

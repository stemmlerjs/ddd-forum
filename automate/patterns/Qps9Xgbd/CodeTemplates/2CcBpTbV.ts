
import { I{{Name | string.pascalsingular}}Repo } from "../{{Name | string.camelsingular}}Repo";
import { {{Name | string.pascalsingular}}Id } from "../../domain/{{Name | string.camelsingular}}Id";
import { {{Name | string.pascalsingular}} } from "../../domain/{{Name | string.camelsingular}}";
import { {{Name | string.pascalsingular}}Map } from "../../mappers/{{Name | string.camelsingular}}Map";

export class {{Name | string.pascalsingular}}Repo implements I{{Name | string.pascalsingular}}Repo {

  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery (): any {
    const models = this.models;
    return {
      where: {},
      include: []
    }
  }

  public async exists ({{Name | string.camelsingular}}Id: {{Name | string.pascalsingular}}Id): Promise<boolean> {
    const {{Name | string.pascalsingular}}Model = this.models.{{Name | string.pascalsingular}};
    const baseQuery = this.createBaseQuery();
    baseQuery.where['{{Name | string.camelsingular}}_id'] = {{Name | string.camelsingular}}Id.id.toString();
    const {{Name | string.camelsingular}} = await {{Name | string.pascalsingular}}Model.findOne(baseQuery);
    const found = !!{{Name | string.camelsingular}} === true;
    return found;
  }

  public delete ({{Name | string.camelsingular}}Id: {{Name | string.pascalsingular}}Id): Promise<void> {
    const {{Name | string.pascalsingular}}Model = this.models.{{Name | string.pascalsingular}};
    return {{Name | string.pascalsingular}}Model.destroy({ where: { {{Name | string.camelsingular}}_id: {{Name | string.camelsingular}}Id.id.toString() }});
  }

  public async save ({{Name | string.camelsingular}}: {{Name | string.pascalsingular}}): Promise<void> {
    const {{Name | string.pascalsingular}}Model = this.models.{{Name | string.pascalsingular}};
    const exists = await this.exists({{Name | string.camelsingular}}.{{Name | string.camelsingular}}Id);
    const isNew{{Name | string.pascalsingular}} = !exists;
    const rawSequelize{{Name | string.pascalsingular}} = await {{Name | string.pascalsingular}}Map.toPersistence({{Name | string.camelsingular}});
    
    if (isNew{{Name | string.pascalsingular}}) {

      try {
        await {{Name | string.pascalsingular}}Model.create(rawSequelize{{Name | string.pascalsingular}});
        
      } catch (err) {
        await this.delete({{Name | string.camelsingular}}.{{Name | string.camelsingular}}Id);
        throw new Error(err.toString())
      }

    } else {
      await {{Name | string.pascalsingular}}Model.update(rawSequelize{{Name | string.pascalsingular}}, { 
        // To make sure your hooks always run, make sure to include this in
        // the query
        individualHooks: true,  
        hooks: true,
        where: { {{Name | string.camelsingular}}_id: {{Name | string.camelsingular}}.{{Name | string.camelsingular}}Id.id.toString() }
      });
    }
  }
}

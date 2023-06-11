
import express from 'express';
import { middleware } from '../../../../../shared/infra/http';
{{~for usecase in UseCase.Items~}}
import { {{usecase.Name | string.camelsingular}}{{Name | string.pascalsingular}}Controller } from '../../../useCases/{{Name | string.camelsingular}}/{{usecase.Name | string.camelsingular}}{{Name | string.pascalsingular}}';
{{~end~}}

const {{Name | string.camelsingular}}Router = express.Router();

{{~for usecase in UseCase.Items~}}
{{Name | string.camelsingular}}Router.{{if (usecase.Kind=="command")}}post{{else}}get{{end}}('{{usecase.Route}}',
  {{if (usecase.IsAuthenticated)}}middleware.ensureAuthenticated(),{{end}}
  (req, res) => {{usecase.Name | string.camelsingular}}{{Name | string.pascalsingular}}Controller.execute(req, res)
)
{{~end~}}

export {
  {{Name | string.camelsingular}}Router
}


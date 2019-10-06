
import { MemberRepo } from "./implementations/sequelizeMemberRepo";
import models from "../../../shared/infra/database/sequelize/models";

const memberRepo = new MemberRepo(models);

export { memberRepo };

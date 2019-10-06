
import { MemberRepo } from "./implementations/sequelizeMemberRepo";
import models from "../../../shared/infra/database/sequelize/models";
import { PostRepo } from "./implementations/sequelizePostRepo";

const memberRepo = new MemberRepo(models);
const postRepo = new PostRepo(models);

export { memberRepo, postRepo };

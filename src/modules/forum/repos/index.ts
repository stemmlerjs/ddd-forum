
import { MemberRepo } from "./implementations/sequelizeMemberRepo";
import models from "../../../shared/infra/database/sequelize/models";
import { PostRepo } from "./implementations/sequelizePostRepo";
import { CommentRepo } from "./implementations/commentRepo";
import { PostId } from "../domain/postId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

const memberRepo = new MemberRepo(models);
const commentRepo = new CommentRepo(models);
const postRepo = new PostRepo(models, commentRepo);


export { memberRepo, postRepo, commentRepo };

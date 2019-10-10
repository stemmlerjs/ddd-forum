
import { MemberRepo } from "./implementations/sequelizeMemberRepo";
import models from "../../../shared/infra/database/sequelize/models";
import { PostRepo } from "./implementations/sequelizePostRepo";
import { CommentRepo } from "./implementations/commentRepo";
import { PostVotesRepo } from "./implementations/sequelizePostVotesRepo";
import { CommentVotesRepo } from "./implementations/sequelizeCommentVotesRepo";
import { PostId } from "../domain/postId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";


const commentVotesRepo = new CommentVotesRepo(models);

commentVotesRepo.countAllPostCommentDownvotes(
  PostId.create(new UniqueEntityID('62678c9d-f3fb-4483-baee-d520077e1d8a')).getValue()
)
.then((c) => console.log(c))
.catch((err) => console.log(err));

const postVotesRepo = new PostVotesRepo(models);
const memberRepo = new MemberRepo(models);
const commentRepo = new CommentRepo(models, commentVotesRepo);
const postRepo = new PostRepo(models, commentRepo, postVotesRepo);


export { memberRepo, postRepo, commentRepo, postVotesRepo, commentVotesRepo };

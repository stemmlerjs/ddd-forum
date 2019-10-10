"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelizeMemberRepo_1 = require("./implementations/sequelizeMemberRepo");
const models_1 = __importDefault(require("../../../shared/infra/database/sequelize/models"));
const sequelizePostRepo_1 = require("./implementations/sequelizePostRepo");
const commentRepo_1 = require("./implementations/commentRepo");
const sequelizePostVotesRepo_1 = require("./implementations/sequelizePostVotesRepo");
const sequelizeCommentVotesRepo_1 = require("./implementations/sequelizeCommentVotesRepo");
const postId_1 = require("../domain/postId");
const UniqueEntityID_1 = require("../../../shared/domain/UniqueEntityID");
const commentVotesRepo = new sequelizeCommentVotesRepo_1.CommentVotesRepo(models_1.default);
exports.commentVotesRepo = commentVotesRepo;
commentVotesRepo.countAllPostCommentDownvotes(postId_1.PostId.create(new UniqueEntityID_1.UniqueEntityID('62678c9d-f3fb-4483-baee-d520077e1d8a')).getValue())
    .then((c) => console.log(c))
    .catch((err) => console.log(err));
const postVotesRepo = new sequelizePostVotesRepo_1.PostVotesRepo(models_1.default);
exports.postVotesRepo = postVotesRepo;
const memberRepo = new sequelizeMemberRepo_1.MemberRepo(models_1.default);
exports.memberRepo = memberRepo;
const commentRepo = new commentRepo_1.CommentRepo(models_1.default, commentVotesRepo);
exports.commentRepo = commentRepo;
const postRepo = new sequelizePostRepo_1.PostRepo(models_1.default, commentRepo, postVotesRepo);
exports.postRepo = postRepo;
//# sourceMappingURL=index.js.map
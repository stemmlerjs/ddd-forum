
import { createMember } from "../useCases/members/createMember";
import { AfterUserCreated } from "./afterUserCreated";
import { AfterCommentPosted } from "./afterCommentPosted";
import { updatePostStats } from "../useCases/post/updatePostStats";
import { AfterCommentVotesChanged } from "./afterCommentVotesChanged";
import { updateCommentStats } from "../useCases/comments/updateCommentStats";
import { AfterPostVotesChanged } from "./afterPostVotesChanged";

// Subscriptions
new AfterUserCreated(createMember);
new AfterCommentPosted(updatePostStats);
new AfterCommentVotesChanged(updatePostStats, updateCommentStats);
new AfterPostVotesChanged(updatePostStats);
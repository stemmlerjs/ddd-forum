
import { createMember } from "../useCases/members/createMember";
import { AfterUserCreated } from "./afterUserCreated";
import { AfterCommentPosted } from "./afterCommentPosted";
import { updatePostStats } from "../useCases/post/updatePostStats";

// Subscriptions
new AfterUserCreated(createMember);
new AfterCommentPosted(updatePostStats);


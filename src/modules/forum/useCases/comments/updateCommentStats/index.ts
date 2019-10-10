
import { UpdateCommentStats } from "./UpdateCommentStats";
import { commentRepo, commentVotesRepo } from "../../../repos";

const updateCommentStats = new UpdateCommentStats(commentRepo, commentVotesRepo);

export {
  updateCommentStats
}

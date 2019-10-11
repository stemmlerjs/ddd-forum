
import { UpdatePostStats } from "./UpdatePostStats";
import { postRepo, postVotesRepo, commentVotesRepo } from "../../../repos";

const updatePostStats = new UpdatePostStats(
  postRepo, postVotesRepo, commentVotesRepo
)

export {
  updatePostStats
}

import { UpdatePostStats } from "./UpdatePostStats";
import { postRepo } from "../../../repos";

const updatePostStats = new UpdatePostStats(
  postRepo
)

export {
  updatePostStats
}
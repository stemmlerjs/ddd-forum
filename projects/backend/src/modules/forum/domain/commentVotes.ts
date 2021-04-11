
import { CommentVote } from "./commentVote";
import { WatchedList } from "../../../shared/domain/WatchedList";

export class CommentVotes extends WatchedList<CommentVote> {
  private constructor (initialVotes: CommentVote[]) {
    super(initialVotes)
  }

  public compareItems (a: CommentVote, b: CommentVote): boolean {
    return a.equals(b)
  }

  public static create (initialVotes?: CommentVote[]): CommentVotes {
    return new CommentVotes(initialVotes ? initialVotes : []);
  }
}
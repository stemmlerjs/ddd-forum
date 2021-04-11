
import { WatchedList } from "../../../shared/domain/WatchedList";
import { Comment } from "./comment";

export class Comments extends WatchedList<Comment> {
  private constructor (initialVotes: Comment[]) {
    super(initialVotes)
  }

  public compareItems (a: Comment, b: Comment): boolean {
    return a.equals(b)
  }

  public static create (comments?: Comment[]): Comments {
    return new Comments(comments ? comments : []);
  }
}
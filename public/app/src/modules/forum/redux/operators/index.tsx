
import { submitPost } from "./submitPost";
import { PostType } from "../../models/Post";

export interface IForumOperations {
  submitPost: (title: string, type: PostType, text?: string, link?: string) => void;
} 

export {
  submitPost
}
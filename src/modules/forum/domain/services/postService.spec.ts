import { Comment } from "../comment"
import { PostService } from "./postService";
import { Post } from "../post";
import { PostTitle } from "../postTitle";
import { PostText } from "../postText";
import { PostSlug } from "../postSlug";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { MemberId } from "../memberId";
import { CommentText } from "../commentText";
import { Member } from "../member";
import { UserName } from "../../../users/domain/userName";
import { UserId } from "../../../users/domain/userId";
import { CommentVote } from "../commentVote";

let comment: Comment;
let post: Post;
let postService: PostService;
let postTitle: PostTitle;

let memberIdOne: MemberId = MemberId
  .create(new UniqueEntityID('stemmlerjs'))
  .getValue();

let memberOne: Member = Member.create({
  username: UserName.create({ name: 'stemmlerjs' }).getValue(),
  userId: UserId.create(new UniqueEntityID('stemmlerjs')).getValue()
}, memberIdOne.id).getValue();

let memberIdTwo: MemberId = MemberId
  .create(new UniqueEntityID('billybob'))
  .getValue();

let memberTwo: Member = Member.create({
  username: UserName.create({ name: 'billybob' }).getValue(),
  userId: UserId.create(new UniqueEntityID('billybob')).getValue()
}, memberIdTwo.id).getValue();

let memberOneCommentVotes: CommentVote[];
let memberTwoCommentVotes: CommentVote[];

beforeEach(() => {
  comment = null;
  post = null;
  postService = new PostService();
  memberOneCommentVotes = []
  memberTwoCommentVotes = [];
})

test ('Toggling upvote on a new comment using the same member simply removes the initial vote', () => {
  postTitle = PostTitle.create({ value: 'Cool first post!' }).getValue();
  
  post = Post.create({ 
    title: postTitle,
    memberId: memberIdOne,
    type: 'text',
    text: PostText.create({ value: "Wow, this is a sick post!" }).getValue(),
    slug: PostSlug.create(postTitle).getValue()
  }).getValue()

  comment = Comment.create({ 
    text: CommentText.create({ value: "yeah" }).getValue(),
    memberId: memberIdOne,
    postId: post.postId
  })
  .getValue();

  // Add it to the post
  post.addComment(comment);

  // Post points should still be one. We don't up the points until we see upvotes.
  expect(post.points).toEqual(1);

  expect(comment.getVotes().currentItems.length).toBe(1);
  expect(comment.getVotes().currentItems[0].isUpvote()).toBe(true);
  expect(comment.getVotes().currentItems[0].memberId.equals(memberIdOne)).toBe(true);
  
  postService.toggleCommentUpvote(post, memberOne, comment, comment.getVotes().currentItems);

  // We just removed the only upvote we had on here
  expect(comment.points).toEqual(0);
  expect(comment.getVotes().currentItems.length).toBe(0);

  // Doing it again puts the points back up to one
  postService.toggleCommentUpvote(post, memberOne, comment, comment.getVotes().currentItems);
  expect(comment.points).toEqual(1);

})

test ('Upvoting', () => {
  postTitle = PostTitle.create({ value: 'Cool first post!' }).getValue();
  post = Post.create({ 
    title: postTitle,
    memberId: memberIdOne,
    type: 'text',
    text: PostText.create({ value: "Wow, this is a sick post!" }).getValue(),
    slug: PostSlug.create(postTitle).getValue()
  }).getValue()

  comment = Comment.create({ 
    text: CommentText.create({ value: "Yeah" }).getValue(),
    memberId: memberIdOne,
    postId: post.postId
  }).getValue();

  // Add it to the post. Given the original upvote, it should be equal to 1.
  post.addComment(comment);
  expect(post.points).toEqual(1);
  expect(comment.points).toEqual(1);

  // Now, if member two upvotes the comment...
  postService.toggleCommentUpvote(post, memberTwo, comment, memberTwoCommentVotes);

  // There should be one vote for member two from that
  memberTwoCommentVotes = comment.getVotes().getItems().filter((c) => c.memberId.equals(memberIdTwo))
  expect(memberTwoCommentVotes.length).toBe(1);

  // The comment should have two points
  expect(comment.points).toEqual(2);

  // And the post should have 2 points (initial post vote + member two upvote),
  // (we don't count the initial comment vote as an upvote)
  expect(post.points).toEqual(2);

})
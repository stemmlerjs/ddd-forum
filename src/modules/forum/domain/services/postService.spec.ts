
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

test ('Comments: Given one member, a downvote to a post without any votes should add one downvote', () => {
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
  }, new UniqueEntityID(''))
  .getValue();


  // Add comment to post
  post.addComment(comment);

  postService.downvoteComment(post, memberOne, comment, memberOneCommentVotes);

  expect(comment.getVotes().getItems().length).toEqual(1);
  expect(comment.getVotes().getItems()[0].isDownvote()).toEqual(true);
  expect(comment.getVotes().getNewItems().length).toEqual(1);
  expect(comment.getVotes().getRemovedItems().length).toEqual(0);

});

test ('Comments: Given one member, several downvotes to an already downvoted post should do nothing.', () => {
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
  }, new UniqueEntityID(''))
  .getValue();


  // Add comment to post
  post.addComment(comment);

  postService.downvoteComment(post, memberOne, comment, memberOneCommentVotes);

  // After it's saved to a repo, we'd return the list again
  memberOneCommentVotes = comment.getVotes().getItems().filter((v) => v.memberId.equals(memberOne))
  expect(memberOneCommentVotes.length).toEqual(1);

  postService.downvoteComment(post, memberOne, comment, memberOneCommentVotes);
  postService.downvoteComment(post, memberOne, comment, memberOneCommentVotes);
  
  expect(memberOneCommentVotes.length).toEqual(1);

  expect(comment.getVotes().getItems().length).toEqual(1);
  expect(comment.getVotes().getItems()[0].isDownvote()).toEqual(true);
  expect(comment.getVotes().getNewItems().length).toEqual(1);
  expect(comment.getVotes().getRemovedItems().length).toEqual(0);

});


test('Comments: Given one member, a downvote to a comment it already upvoted should merely remove the upvote and create no additional downvote', () => {
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
  }, new UniqueEntityID(''))
  .getValue();


  // Add comment to post
  post.addComment(comment);

  // Create existing upvotes
  memberOneCommentVotes = [CommentVote.createUpvote(memberIdOne, comment.commentId).getValue()];
  postService.downvoteComment(post, memberOne, comment, memberOneCommentVotes);

  expect(comment.getVotes().getRemovedItems().length).toEqual(1);

  // we don't do two operations, so we should ONLY merely remove the upvote.
  expect(comment.getVotes().getNewItems().length).toEqual(0);     
})

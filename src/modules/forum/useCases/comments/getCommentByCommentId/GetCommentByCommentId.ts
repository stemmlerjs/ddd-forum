
import { UseCase } from "../../../../../shared/core/UseCase";
import { ICommentRepo } from "../../../repos/commentRepo";
import { GetCommentByCommentIdRequestDTO } from "./GetCommentByCommentIdRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { CommentDetails } from "../../../domain/commentDetails";
import { AppError } from "../../../../../shared/core/AppError";
import { GetCommentByCommentIdErrors } from "./GetCommentByCommentIdErrors";
import { MemberId } from "../../../domain/memberId";
import { IMemberRepo } from "../../../repos/memberRepo";
import * as express from 'express'

type Response = Either<
  GetCommentByCommentIdErrors.CommentNotFoundError |
  AppError.UnexpectedError,
  Result<CommentDetails>
>

export class GetCommentByCommentId implements UseCase<GetCommentByCommentIdRequestDTO, Promise<Response>> {
  private commentRepo: ICommentRepo;
  private memberRepo: IMemberRepo;

  constructor (commentRepo: ICommentRepo, memberRepo: IMemberRepo) {
    this.commentRepo = commentRepo;
    this.memberRepo = memberRepo;
  }

  public async execute (req: GetCommentByCommentIdRequestDTO): Promise<Response> {
    let comment: CommentDetails;
    let memberId: MemberId;

    try {

      const isAuthenticated = !!req.userId === true;

      if (isAuthenticated) {
        memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
      }

      try {
        comment = await this.commentRepo.getCommentDetailsByCommentId(
          req.commentId,
          memberId
        )
      } catch (err) {
        return left(new GetCommentByCommentIdErrors.CommentNotFoundError(req.commentId));
      }

      return right(Result.ok<CommentDetails>(comment));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
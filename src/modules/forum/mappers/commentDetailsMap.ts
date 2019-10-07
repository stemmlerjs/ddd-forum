
import { Mapper } from "../../../shared/infra/Mapper";
import { CommentDetails } from "../domain/commentDetails";
import { CommentDTO } from "../dtos/commentDTO";

export class CommentDetailsMap implements Mapper<CommentDetails> {

  public static toDomain (raw: any): CommentDetails {
    return null;
  }

  public static toDTO (commentDetails: CommentDetails): CommentDTO {
    return null;
  } 
}
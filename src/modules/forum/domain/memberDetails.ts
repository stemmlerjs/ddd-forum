import { ValueObject } from "../../../shared/domain/ValueObject";

interface MemberDetailsProps {

}

/**
 * @desc Read model for member
 */

export class MemberDetails extends ValueObject<MemberDetailsProps> {
  private constructor (props: MemberDetailsProps) {
    super(props);
  }
}

import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { UserId } from "../../users/domain/userId";
import { UserName } from "../../users/domain/userName";
import { Guard } from "../../../shared/core/Guard";
import { MemberCreated } from "./events/memberCreated";

interface MemberProps {
  userId: UserId;
  username: UserName;
  reputation?: number;
}

export class Member extends AggregateRoot<MemberProps> {

  private constructor (props: MemberProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: MemberProps, id?: UniqueEntityID): Result<Member> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.username, argumentName: 'username' }
    ])

    if (!guardResult.succeeded) {
      return Result.fail<Member>(guardResult.message);
    }

    const defaultValues: MemberProps = {
      ...props,
      reputation: props.reputation ? props.reputation : 0
    }

    const member = new Member(defaultValues, id);
    const isNewMember = !!id === false;

    if (isNewMember) {
      member.addDomainEvent(new MemberCreated(member));
    }

    return Result.ok<Member>(member);
  }
}
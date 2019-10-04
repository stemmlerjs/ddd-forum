
import { Mapper } from '../../../shared/infra/Mapper'
import { User } from '../domain/user';
import { UserDTO } from '../dtos/userDTO';

export class UserMap implements Mapper<User> {
  public static toDTO (user: User): UserDTO {
    return {

    }
  }

  public static toDomain (raw: any): User {
    return null;
  }

  public static toPersistence (user: User): any {
    return {

    }
  }
}
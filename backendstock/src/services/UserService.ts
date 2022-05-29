import Service, { ServiceError } from '.';
import { User,
  UserSchema } from '../interfaces/UserInterface';
import UserModel from '../models/UserModel';

class UserService extends Service<User> {
  constructor(model = new UserModel()) {
    super(model);
  }

  create = async (
    userObj: User,
  ): Promise< User | ServiceError | null > => {
    const parse = UserSchema.safeParse(userObj);
    if (!parse.success) {
      return { error: parse.error };
    }
    return this.model.create(userObj);
  };
}

export default UserService;
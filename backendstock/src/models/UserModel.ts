import { Schema, model as createModel, Document } from 'mongoose';
import { User } from '../interfaces/UserInterface';
import MongoModel from './MongoModel';

export interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>({
  username: String,
  password: String,
  level: String,
}, { versionKey: false });

class UserModel extends MongoModel<User> {
  constructor(model = createModel('Users', UserSchema)) {
    super(model);
  }

  update = async (id: string, object: User): 
  Promise<User | null> => 
    this.model.findByIdAndUpdate(id, object, { new: true });
}

export default UserModel;
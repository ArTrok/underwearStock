import Service, { ServiceError } from '.';
import { Motorcycle,
  MotorcycleSchema } from '../interfaces/UserInterface';
import UserModel from '../models/UserModel';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new UserModel()) {
    super(model);
  }

  create = async (
    motorcycleObj: Motorcycle,
  ): Promise< Motorcycle | ServiceError | null > => {
    const parse = MotorcycleSchema.safeParse(motorcycleObj);
    if (!parse.success) {
      return { error: parse.error };
    }
    return this.model.create(motorcycleObj);
  };
}

export default MotorcycleService;
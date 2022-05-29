import Service, { ServiceError } from '.';
import { Motorcycle,
  MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
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
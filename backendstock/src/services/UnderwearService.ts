import Service, { ServiceError } from '.';
import { Underwear, UnderwearSchema } from '../interfaces/UnderwearInterface';
import UnderwearModel from '../models/UnderwearModel';

class UnderwearService extends Service<Underwear> {
  constructor(model = new UnderwearModel()) {
    super(model);
  }

  create = async (underwearObj: Underwear): Promise< Underwear | ServiceError | null > => {
    const parse = UnderwearSchema.safeParse(underwearObj);
    if (!parse.success) {
      return { error: parse.error };
    }
    return this.model.create(underwearObj);
  };
}

export default UnderwearService;
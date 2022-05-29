import Service, { ServiceError } from '.';
import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (carObj: Car): Promise< Car | ServiceError | null > => {
    const parse = CarSchema.safeParse(carObj);
    if (!parse.success) {
      return { error: parse.error };
    }
    return this.model.create(carObj);
  };
}

export default CarService;
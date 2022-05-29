import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

export interface CarDocument extends Car, Document {}

const carSchema = new Schema<CarDocument>({
  status: Boolean || undefined,
  doorsQty: Number,
  seatsQty: Number,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
}, { versionKey: false });

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }

  update = async (id: string, object: Car): Promise<Car | null> => 
    this.model.findByIdAndUpdate(id, object, { new: true });
}

export default CarModel;
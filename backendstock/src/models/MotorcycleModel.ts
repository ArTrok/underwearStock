import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

export interface MotorcycleDocument extends Motorcycle, Document {}

const motorcycleSchema = new Schema<MotorcycleDocument>({
  status: Boolean || undefined,
  category: String,
  engineCapacity: Number,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
}, { versionKey: false });

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycles', motorcycleSchema)) {
    super(model);
  }

  update = async (id: string, object: Motorcycle): 
  Promise<Motorcycle | null> => 
    this.model.findByIdAndUpdate(id, object, { new: true });
}

export default MotorcycleModel;
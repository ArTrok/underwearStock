import { Schema, model as createModel, Document } from 'mongoose';
import { Underwear } from '../interfaces/UnderwearInterface';
import MongoModel from './MongoModel';

export interface UnderwearDocument extends Underwear, Document {}

const underwearSchema = new Schema<UnderwearDocument>({
  item: String,
  color: String,
  size: String,
  quantity: Number,
  costValue: Number,
  sellValue: Number,
}, { versionKey: false });

class UnderwearModel extends MongoModel<Underwear> {
  constructor(model = createModel('Underwears', underwearSchema)) {
    super(model);
  }

  update = async (id: string, object: Underwear): Promise<Underwear | null> => 
    this.model.findByIdAndUpdate(id, object, { new: true });
}

export default UnderwearModel;
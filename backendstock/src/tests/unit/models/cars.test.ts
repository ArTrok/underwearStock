import Sinon from "sinon";
import { Model } from 'mongoose';
import CarModel, { UnderwearDocument } from "../../../models/UnderwearModel";

const createMock = Sinon.spy();
const readMock = Sinon.spy();
const readOneMock = Sinon.spy();
const updateMock = Sinon.spy();
const deleteMock = Sinon.spy();

const modelMock = {
  create: createMock,
  find: readMock,
  findOne: readOneMock,
  findByIdAndUpdate: updateMock,
  findByIdAndDelete: deleteMock,
} as unknown as Model<UnderwearDocument>;

const validCar = {
  _id: '1j029djiso092wopd1j92d10oij',
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

describe('CarModel', () => {
  describe('create car', () => {
    it('Calls create function from model', async () => {
      const carModel = new CarModel(modelMock);

      await carModel.create(validCar);

      Sinon.assert.called(createMock);
    })
  });

  describe('read car', () => {
    it('Calls read function from model', async () => {
      const carModel = new CarModel(modelMock);

      await carModel.read();

      Sinon.assert.called(readMock);
    })
  });

  describe('readOne car', () => {
    it('Calls readOne function from model', async () => {
      const carModel = new CarModel(modelMock);

      await carModel.readOne(validCar._id);

      Sinon.assert.called(readOneMock);
    })
  });

  describe('update car', () => {
    it('Calls update function from model', async () => {
      const carModel = new CarModel(modelMock);

      await carModel.update(validCar._id, validCar);

      Sinon.assert.called(updateMock);
    })
  });

  describe('delete car', () => {
    it('Calls delete function from model', async () => {
      const carModel = new CarModel(modelMock);

      await carModel.delete(validCar._id);

      Sinon.assert.called(deleteMock);
    })
  });
});
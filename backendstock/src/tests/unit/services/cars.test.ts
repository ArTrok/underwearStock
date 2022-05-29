import Sinon from "sinon";
import CarService from "../../../services/CarService";
import CarModel from "../../../models/CarModel";

const createMock = Sinon.spy();
const readMock = Sinon.spy();
const readOneMock = Sinon.spy();
const updateMock = Sinon.spy();
const deleteMock = Sinon.spy();

const modelMock = {
  create: createMock,
  read: readMock,
  readOne: readOneMock,
  update: updateMock,
  delete: deleteMock,
} as unknown as CarModel;

const validCar = {
  _id: '1j029djiso092wopd1j92d10oij',
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

describe('CarService', () => {
  describe('create car', () => {
    it('Calls create function from service', async () => {
      const carService = new CarService(modelMock);

      await carService.create(validCar);

      Sinon.assert.called(createMock);
    })
  });

  describe('read car', () => {
    it('Calls read function from service', async () => {
      const carService = new CarService(modelMock);

      await carService.read();

      Sinon.assert.called(readMock);
    })
  });

  describe('readOne car', () => {
    it('Calls readOne function from service', async () => {
      const carService = new CarService(modelMock);

      await carService.readOne(validCar._id);

      Sinon.assert.called(readOneMock);
    })
  });

  describe('update car', () => {
    it('Calls update function from service', async () => {
      const carService = new CarService(modelMock);

      await carService.update(validCar._id, validCar);

      Sinon.assert.called(updateMock);
    })
  });

  describe('delete car', () => {
    it('Calls delete function from service', async () => {
      const carService = new CarService(modelMock);

      await carService.delete(validCar._id);

      Sinon.assert.called(deleteMock);
    })
  });
});
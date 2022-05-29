import Sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import server from '../../../server';
import CarService from "../../../services/CarService";

chai.use(chaiHttp);

const { expect } = chai;

const validCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

const validCarRes = {
  _id: '62915f43ba838203ca1bd742',
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

describe('CarController', () => {
  describe('Create car', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'create')
      .resolves(validCarRes);
    });

    after(()=>{
      (carService.create as sinon.SinonStub).restore();
    })
    
    it('valid car - create controller', () => {
      chai.request(server.app)
        .get('/cars').send()
        .end((_err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.text).to.be.equal(JSON.stringify(validCarRes));
      });
    });
  });

  describe('Read cars', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'read')
      .resolves([validCarRes]);
    });

    after(()=>{
      (carService.read as sinon.SinonStub).restore();
    })
    
    it('valid car - get controller', () => {
      chai.request(server.app)
        .get('/cars').send()
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.text).to.be.equal(JSON.stringify([validCarRes]));
      });
    });
  });

  describe('ReadOne car', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'readOne')
      .resolves(validCarRes);
    });

    after(()=>{
      (carService.readOne as sinon.SinonStub).restore();
    })
    
    it('valid car - readOne controller', () => {
      chai.request(server.app)
        .get('/cars/62915f43ba838203ca1bd742').send()
        .end((_err, res) => {
          expect(res).to.have.status(200);
      });
    });

    it('invalid id - readOne controller', () => {
      chai.request(server.app)
        .get('/cars/62915f43ba838203ca1bd742').send()
        .end((_err, res) => {
          expect(res).to.have.status(400);
      });
    });
  });

  describe('Update car', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'update')
      .resolves(validCarRes);
    });

    after(()=>{
      (carService.update as sinon.SinonStub).restore();
    })
    
    it('valid car - update controller', () => {
      chai.request(server.app)
        .put('/cars/62915f43ba838203ca1bd742').send(validCar)
        .end((_err, res) => {
          expect(res).to.have.status(200);
      });
    });

    it('no body - update controller', () => {
      chai.request(server.app)
        .put('/cars/62915f43ba838203ca1bd742').send()
        .end((_err, res) => {
          expect(res).to.have.status(400);
      });
    });

    it('no valid id - update controller', () => {
      chai.request(server.app)
        .put('/cars/62915f43ba838203ca').send()
        .end((_err, res) => {
          expect(res).to.have.status(400);
      });
    });
  });

  describe('Delete car', async () => {
    const carService = new CarService();
    before(async () => {
      Sinon
      .stub(carService, 'delete')
      .resolves();
    });

    after(()=>{
      (carService.delete as sinon.SinonStub).restore();
    })
    
    it('valid car - delete controller', () => {
      chai.request(server.app)
        .delete('/cars/62915f43ba838203ca1bd742').send()
        .end((_err, res) => {
          expect(res).to.have.status(204);
      });
    });

    it('invalid id - delete controller', () => {
      chai.request(server.app)
        .delete('/cars/62915f43ba838203ca1bd742').send()
        .end((_err, res) => {
          expect(res).to.have.status(400);
      });
    });
  });
});

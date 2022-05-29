import CustomRouter from './routes/Router';
import App from './app';

import UnderwearController from './controllers/UnderwearController';
import MotorcycleController from './controllers/MotorcycleController';

import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/UserInterface';

const server = new App();

const carController = new UnderwearController();
const motorcycleController = new MotorcycleController();

const carRouter = new CustomRouter<Car>();
const motorcycleRouter = new CustomRouter<Motorcycle>();

carRouter.addRoute(carController);
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;

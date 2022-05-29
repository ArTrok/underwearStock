import CustomRouter from './routes/Router';
import App from './app';

import UnderwearController from './controllers/UnderwearController';
import UserController from './controllers/UserController';

import { Underwear } from './interfaces/UnderwearInterface';
import { User } from './interfaces/UserInterface';

const server = new App();

const carController = new UnderwearController();
const motorcycleController = new UserController();

const carRouter = new CustomRouter<Underwear>();
const motorcycleRouter = new CustomRouter<User>();

carRouter.addRoute(carController);
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;

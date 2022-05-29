import CustomRouter from './routes/Router';
import App from './app';

import UnderwearController from './controllers/UnderwearController';
import UserController from './controllers/UserController';

import { Underwear } from './interfaces/UnderwearInterface';
import { User } from './interfaces/UserInterface';

const server = new App();

const underwearController = new UnderwearController();
const userController = new UserController();

const underwearRouter = new CustomRouter<Underwear>();
const userRouter = new CustomRouter<User>();

underwearRouter.addRoute(underwearController);
userRouter.addRoute(userController);

server.addRouter(underwearRouter.router);
server.addRouter(userRouter.router);

export default server;

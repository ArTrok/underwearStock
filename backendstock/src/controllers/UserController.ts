import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import UserService from '../services/UserService';
import { User } from '../interfaces/UserInterface';

export default class UserController extends Controller<User> {
  private $route: string;

  constructor(
    service = new UserService(),
    route = '/users',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<User>,
    res: Response< User | ResponseError >,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const user = await this.service.create(body);
      if (!user) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in user) {
        return res.status(400).json(user);
      }
      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response< User | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400).json({ error: this.extraErrors.minCharacters }); 
    }
    try {
      const user = await this.service.readOne(id);
      return user
        ? res.json(user)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<User & { id: string }>,
    res: Response<User | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (id.length < 24) {
      return res.status(400).json({ error: this.extraErrors.minCharacters }); 
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: this.extraErrors.noBody });
    }
  
    try {
      const user = await this.service.update(id, req.body);
      
      return user
        ? res.json(user)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<void | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400).json({ error: this.extraErrors.minCharacters }); 
    }
    try {
      const user = await this.service.delete(id);
      return user
        ? res.status(204).json()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcyleService from '../services/Motorcycleservice';
import { Motorcycle } from '../interfaces/UserInterface';

export default class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(
    service = new MotorcyleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response< Motorcycle | ResponseError >,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);
      if (!motorcycle) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in motorcycle) {
        return res.status(400).json(motorcycle);
      }
      return res.status(201).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response< Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400).json({ error: this.extraErrors.minCharacters }); 
    }
    try {
      const motorcycle = await this.service.readOne(id);
      return motorcycle
        ? res.json(motorcycle)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle & { id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (id.length < 24) {
      return res.status(400).json({ error: this.extraErrors.minCharacters }); 
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: this.extraErrors.noBody });
    }
  
    try {
      const motorcycle = await this.service.update(id, req.body);
      
      return motorcycle
        ? res.json(motorcycle)
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
      const motorcycle = await this.service.delete(id);
      return motorcycle
        ? res.status(204).json()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
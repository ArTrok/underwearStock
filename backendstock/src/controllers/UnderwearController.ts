import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import UnderwearService from '../services/UnderwearService';
import { Underwear } from '../interfaces/UnderwearInterface';

export default class UnderwearController extends Controller<Underwear> {
  private $route: string;

  constructor(
    service = new UnderwearService(),
    route = '/underwears',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Underwear>,
    res: Response< Underwear | ResponseError >,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const underwear = await this.service.create(body);
      if (!underwear) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in underwear) {
        return res.status(400).json(underwear);
      }
      return res.status(201).json(underwear);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response< Underwear | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400).json({ error: this.extraErrors.minCharacters }); 
    }
    try {
      const underwear = await this.service.readOne(id);
      return underwear
        ? res.json(underwear)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Underwear & { id: string }>,
    res: Response<Underwear | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (id.length < 24) {
      return res.status(400).json({ error: this.extraErrors.minCharacters }); 
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: this.extraErrors.noBody });
    }
  
    try {
      const underwear = await this.service.update(id, req.body);
      
      return underwear
        ? res.json(underwear)
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
      const underwear = await this.service.delete(id);
      return underwear
        ? res.status(204).json()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

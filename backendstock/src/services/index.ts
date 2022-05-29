import { ZodError, z } from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

abstract class Service<T> {
  private mustHave24Hex = 'Id must have 24 hexadecimal characters';
  
  constructor(protected model: Model<T>) {}

  public async create(obj: T): Promise< T | null | ServiceError > {
    return this.model.create(obj);
  }

  public async read(): Promise< T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise< T | null | ServiceError > {
    const requestedId = z.string()
      .min(24).optional();
    const parsedId = requestedId.safeParse(id);
    if (!parsedId.success) {
      throw new Error(this.mustHave24Hex);
    }
    return this.model.readOne(id);
  }

  public async update(
    id: string,
    body: T,
  ): Promise< T | null | ServiceError > {    
    const requestedId = z.string()
      .min(24).optional();
    const parsedId = requestedId.safeParse(id);
    if (!parsedId.success) {
      throw new Error(this.mustHave24Hex);
    }

    const updated = await this.model.update(id, body);

    return updated;
  }

  public async delete(
    id: string,
  ): Promise< T | null | ServiceError > {
    const requestedId = z.string()
      .min(24).optional();
    const parsedId = requestedId.safeParse(id);
    if (!parsedId.success) {
      throw new Error(this.mustHave24Hex);
    }

    return this.model.delete(id);
  }
}

export default Service;
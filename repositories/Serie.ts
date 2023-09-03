import Serie from '../entities/Serie';
import SerieRepositoryInterface from './Serie.interface';

class SerieRepository implements SerieRepositoryInterface {
  constructor(private readonly serie: Serie) {}

  hasSerieById(id: string): Promise<boolean> {
    return this.serie.hasSerieById(id);
  }

  findById(id: string): Promise<{ [key: string]: any }> {
    this.serie.id = id;
    return this.serie.findById(id);
  }
}

export default SerieRepository;

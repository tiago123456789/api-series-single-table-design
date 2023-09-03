import ErrorCodeMessage from '../config/ErrorCodeMessage';
import SerieRepositoryInterface from '../repositories/Serie.interface';

class SerieService {
  constructor(private readonly serieRepository: SerieRepositoryInterface) {}

  async findById(id: string) {
    const hasSerie = await this.serieRepository.hasSerieById(id);
    if (!hasSerie) {
      throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND);
    }

    return this.serieRepository.findById(id);
  }
}

export default SerieService;

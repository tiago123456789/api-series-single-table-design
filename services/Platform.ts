import ErrorCodeMessage from '../config/ErrorCodeMessage';
import Platform from '../entities/Platform';
import PlatformRepositoryInterface from '../repositories/Platform.interface';
import SerieRepositoryInterface from '../repositories/Serie.interface';

class PlatformService {
  constructor(
    private readonly platformRepository: PlatformRepositoryInterface,
    private readonly serieRepository: SerieRepositoryInterface,
  ) {}

  async create(serieId: string, newPlatfom: Platform) {
    const hasSerie = await this.serieRepository.hasSerieById(serieId);

    if (!hasSerie) {
      throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND);
    }

    await this.platformRepository.create(serieId, newPlatfom);
  }

  async update(serieId: string, id: string, platformModified: Platform) {
    const hasSerie = await this.serieRepository.hasSerieById(serieId);

    if (!hasSerie) {
      throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND);
    }

    await this.platformRepository.update(serieId, id, platformModified);
  }
}

export default PlatformService;

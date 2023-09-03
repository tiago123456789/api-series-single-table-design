import ErrorCodeMessage from '../config/ErrorCodeMessage';
import Episode from '../entities/Episode';
import EpisodeRepositoryInterface from '../repositories/Episode.interface';
import SeasonRepositoryInterface from '../repositories/Season.interface';
import SerieRepositoryInterface from '../repositories/Serie.interface';

class EpisodeService {
  constructor(
    private readonly episodeRepository: EpisodeRepositoryInterface,
    private readonly seasonRepository: SeasonRepositoryInterface,
    private readonly serieRepository: SerieRepositoryInterface,
  ) {}

  async create(serieId: string, seasonId: string, newEpisode: Episode) {
    const hasSerie = await this.serieRepository.hasSerieById(serieId);

    if (!hasSerie) {
      throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND);
    }

    const hasSeason = await this.seasonRepository.hasSeasonById(
      serieId,
      `Season#${seasonId}`,
    );
    if (!hasSeason) {
      throw new Error(ErrorCodeMessage.SEASON_NOT_FOUND);
    }

    await this.episodeRepository.create(serieId, seasonId, newEpisode);
  }

  async update(
    serieId: string,
    seasonId: string,
    id: string,
    episodeModified: Episode,
  ) {
    const hasSerie = await this.serieRepository.hasSerieById(serieId);

    if (!hasSerie) {
      throw new Error(ErrorCodeMessage.SERIE_NOT_FOUND);
    }

    const hasSeason = await this.seasonRepository.hasSeasonById(
      serieId,
      `Season#${seasonId}`,
    );
    if (!hasSeason) {
      throw new Error(ErrorCodeMessage.SEASON_NOT_FOUND);
    }

    await this.episodeRepository.update(serieId, seasonId, id, episodeModified);
  }
}

export default EpisodeService;
